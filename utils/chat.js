const users = []

const addUserChat = ({ id, username, room }) => {
    username = username.replace(/\s/g, "").toLowerCase()
    room = room.replace(/\s/g, "").toLowerCase()
    console.log(room)
    let user;
    const existingUser = users.find((user) => user.room === room && user.username === username)

    if(existingUser){
        console.log('existing user err')
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

const removeUserChat = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

const getActiveRoomsChat = (data) => {
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

const getUserChat = (id) => users.find((user) => user.id === id)

const getUsersInRoomChat = (room) => users.filter((user) => user.room === room)

module.exports = { addUserChat, removeUserChat, getUserChat, getUsersInRoomChat, getActiveRoomsChat }