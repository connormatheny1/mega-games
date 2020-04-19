import React, { useState, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from "./Message/Message"
import './Messages.css'

const Messages = ({ messages, username, emojis }) => (
   <ScrollToBottom className="messages">
       {
            messages.map((message, i) => <div key={i}><Message message={message} username={username} emojis={emojis}/></div>) 
       }
   </ScrollToBottom>
)

export default Messages