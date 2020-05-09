require('dotenv').config();
const express = require('express')
const socketio = require("socket.io")
const http = require('http')
const path = require("path")
const bodyParser = require('body-parser')
const { addUser, removeUser, getUser, getUsersInRoom, getActiveRooms, getOthersInRoom } = require('./utils/users')
const { createDeck, dealCards } = require('./utils/cards')
const PORT = process.env.PORT || 5000

const app = express();
const server = http.createServer(app)
const io = socketio(server)

app.set('port', PORT)

app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, './client/build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

io.of(process.env.NAMESPACE).on('connection', (socket) => {
    console.log('socket connect')
    socket.on('join', ({ username, room }, callback) => {
        const { error, user }= addUser({ id: socket.id, username, room })
        if(error) return callback(error)
        socket.emit('message', { 
            user: 'admin', 
            text: `${user.username}, welcome to ${user.room}`
        })//lets cur user know theyve joined
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.username} has joined`})//lets all other connected users know user above has joined
        socket.join(user.room)
        const availableRooms = getActiveRooms(io.sockets.adapter.rooms);
        socket.emit('roomData', { room: user.room, users: getUsersInRoom(user.room), rooms: availableRooms, socket_id: socket.id })
        socket.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room), rooms: availableRooms, socket_id: socket.id })
        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        socket.emit('message', { user: user.username, text: message })
        socket.broadcast.to(user.room).emit('message', { user: user.username, text: message })
        socket.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        callback()
    })
    

    socket.on('game-started', (data, callback) => {
        const user = getUser(socket.id)
        io.of(process.env.NAMESPACE).to(user.room).emit('start-game', { bool: true })//send game started to everyone in room with deck
    })

    socket.on('get-cards', (data) => {
        console.log(socket.id)
        const user = getUser(socket.id)
        const users = getUsersInRoom(user.room)
        let updatedDeck;
        const deck = createDeck()
        const uirDeck = dealCards(users, deck)
        const usersWithCards = uirDeck[0]
        updatedDeck = uirDeck[1]
        const getUserToSendCards = (id) => usersWithCards.find((user) => user.id == id)
        //might need to move this to give cards to the person that starts the game, send cards to them,
        //then broadcast other hands to others and then do validation for which user receives the cards
        //currently tech savvy users (anyone with react dev tools) can view opponents cards as of inital deal,
        //cant make any breaking game changes as of now and cant effect logic
        //socket.emit('deal-cards-on-start', { users: usersWithCards });
        io.of(process.env.NAMESPACE).to(user.room).emit('deal-cards-on-start', { users: usersWithCards });
        io.of(process.env.NAMESPACE).to(user.room).emit('updated-deck', { deck: updatedDeck })
    })

    socket.on('bad-path', (qs, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('bad-path-ui', {user, error: `Bad path error, no query string location to parse, redirecting...`})
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if(user){
            socket.to(user.room).emit('message', { user: 'admin', text: `${user.username} has left`})
            console.log(`${user.username} has left`)
        }
    })
})

const indexRouter = require('./routes/indexRouter')
const userRouter = require('./routes/userRouter')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//app.use('/', indexRouter)
app.use('/users', userRouter)

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))