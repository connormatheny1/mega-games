const users = []

const addUser = ({ id, username, room }) => {
    username = username.replace(/\s/g, "").toLowerCase()
    room = room.replace(/\s/g, "").toLowerCase()
    console.log(room)
    let user;
    const existingUser = users.find((user) => user.room === room && user.username === username)

    if(existingUser){
        return { error: 'Username taken'}
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

const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => users.filter((user) => user.room === room)

module.exports = { addUser, removeUser, getUser, getUsersInRoom }