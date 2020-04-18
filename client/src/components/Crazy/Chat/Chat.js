import React, { useState, useEffect } from "react"
import queryString from 'query-string'
import io from 'socket.io-client'
import Input from "../../Input/Input"
import Messages from "../../Messages/Messages"
//let socket;


const Chat = (props) => {
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'localhost:5000/crazy/rooms'

    // useEffect(() => {
    //     const { username, room } = queryString.parse(props.location.search)
    //     socket = io(ENDPOINT)
    //     setUsername(username)
    //     setRoom(room)

    //     socket.emit('joined-chat', { username, room }, (error) => {
    //         if(error) {
    //           alert(error);
    //         }
    //       });

    //     return () => {
    //         socket.emit('disconnect')
    //         socket.off();
    //     }
    // }, [ENDPOINT, props.location.search])


    // useEffect(() => {
    //     props.socket.on('message', (message) => {
    //         setMessages([...messages, message])
    //     })

    //     props.socket.on("chatRoomData", ({ users }) => {
    //         setUsers(users)
    //     })
        
    // }, [messages])

    // const sendMessage = (e) => {
    //     e.preventDefault();
    //     if(message){
    //         props.socket.emit('sendMessage', message, () => setMessage(''))
    //     }
    // }

    const sendMessage = (m) => {
        m.preventDefault();
        if(message){
            props.emitSendMessage(message)
        }
    }


    console.log(message, messages)
    console.log(props.socket)

    return(
        <div className="outerContainer">
            <div className="container">
                <Messages messages={props.messages} username={username} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    )
}

export default Chat