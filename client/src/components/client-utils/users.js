const removeUser = (name, users) => {
    const index = users.findIndex((user) => user.username === name)

    if(index !== -1){
        return users.splice(index, 1)
    }
}

module.exports = { removeUser }