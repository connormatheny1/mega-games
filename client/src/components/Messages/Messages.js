import React, { useState, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from "./Message/Message"
import './Messages.css'

const Messages = ({ messages, username}) => (
   <ScrollToBottom className="messages">
       {
           messages ? (
                messages.map((message, i) => <div key={i}><Message message={message} username={username}/></div>)
           ) : (
               <div>
                   <span>No messages yet</span>
               </div>
           )
       }
   </ScrollToBottom>
)

export default Messages