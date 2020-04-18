require('dotenv').config();
const express = require('express')
const socketio = require("socket.io")
const http = require('http')
const bodyParser = require('body-parser')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

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

        
            var availableRooms = [];
            var rooms = io.sockets.adapter.rooms;
            if (rooms) {
                for (var room in rooms) {
                    if (!rooms[room].hasOwnProperty(room)) {
                        availableRooms.push(room);
                    }
                }
            }
             console.log(availableRooms);
        

        socket.emit('roomData', { room: user.room, users: getUsersInRoom(user.room), rooms: availableRooms })
        socket.broadcast.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room),  rooms: availableRooms })

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', { user: user.username, text: message })
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message', { user: 'admin', text: `${user.username} has left`})
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