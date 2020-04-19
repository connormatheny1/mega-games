require('dotenv').config();
const express = require('express')
const socketio = require("socket.io")
const http = require('http')
const bodyParser = require('body-parser')
const { addUser, removeUser, getUser, getUsersInRoom, getActiveRooms } = require('./utils/users')

const PORT = process.env.PORT || 5000

const app = express();
const server = http.createServer(app)
const io = socketio(server)

app.set('port', PORT)

app.use(express.urlencoded({extended: true}))

io.of(process.env.NAMESPACE).on('connection', (socket) => {
    console.log('socket connect')
    socket.on('join', ({ username, room }, callback) => {
        const { error, user }= addUser({ id: socket.id, username, room })

        if(error) return callback(error)
        console.log(socket)
        socket.emit('message', { user: 'admin', text: `${user.username}, welcome to ${user.room}`})//lets cur user know theyve joined
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.username} has joined`})//lets all other connected users know user above has joined

        socket.join(user.room)
        console.log(getUsersInRoom(user.room))
        console.log("rooms: " + io.sockets.adapter.rooms)

        const availableRooms = getActiveRooms(io.sockets.adapter.rooms);
        
        socket.emit('roomData', { room: user.room, users: getUsersInRoom(user.room), rooms: availableRooms, socket_id: socket.id })
        socket.broadcast.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room),  rooms: availableRooms, socket_id: socket.id })

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        console.log(message)
        const user = getUser(socket.id)
        console.log(user)
        socket.emit('message', { user: user.username, text: message })
        socket.broadcast.to(user.room).emit('message', { user: user.username, text: message })
        socket.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        callback()
    })

    socket.on('game-started', (data, callback) => {
        const user = getUser(socket.id)
        socket.emit('start-game', {gameStarted: true})
        socket.broadcast.to(user.room).emit('start-game', {gameStarted: true})
    })

    socket.on('bad-path', (qs, callback) => {
        console.log(qs)
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
app.use('/', indexRouter)
app.use('/users', userRouter)

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))