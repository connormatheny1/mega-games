const users = []
let existed = 0;
const addUser = ({ id, username, room }) => {
    username = username.replace(/\s/g, "").toLowerCase()
    room = room.replace(/\s/g, "").toLowerCase()
    console.log(room)
    let user;
    const existingUser = users.find((user) => user.room === room && user.username === username)

    if(existingUser){
        let newn = `${username}-${existed}`
        user = {id, newn, room, creator: true}
        users.push(user)
        //return { error: 'Username taken'}
    }

    if(users.length < 1){
        user = {id, username, room, creator: true}
        users.push(user)
    }
    else{
        user = { id, username, room, creator: false }
        users.push(user)
    }

    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

const getActiveRooms = (data) => {
    const availableRooms = [];
    const rooms = data;
    if (rooms) {
        for (let room in rooms) {
            if (!rooms[room].hasOwnProperty(room)) {
                availableRooms.push(room);
            }
        }
    }
    return availableRooms;
}

const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => users.filter((user) => user.room === room)
const getOthersInRoom = (room, id) => users.filter((user) => user.room === room && user.id !== id)

module.exports = { addUser, removeUser, getUser, getUsersInRoom, getActiveRooms, getOthersInRoom }