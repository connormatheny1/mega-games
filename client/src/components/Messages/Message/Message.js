import React, { useState, useEffect } from 'react'
import './Message.css'

//const ReactEmoji = require('react-emoji')
import ReactEmoji from 'react-emoji'

const Message = ({ message: { user, text }, username, emojis }) => {
    let isSentByCurrentUser = false

    const trimmedName = username.trim().toLowerCase()

    if(user === trimmedName){
        isSentByCurrentUser = true
    }

    return(
        isSentByCurrentUser
            ? (
                <div className="messageContainer justifyEnd">
                    <p className="sentText pr-10">you</p>
                    <div className="messageBox after backgroundBlue">
                        <p className="messageText colorWhite">{emojis ? ReactEmoji.emojify(text) : text}</p>
                    </div>
                </div>
            )
            : (
                <div className="messageContainer justifyStart">
                    <p className="sentText pl-5">{user}</p>
                    <div className="messageBox before backgroundLight">
                        <p className="messageText colorDark">{emojis ? ReactEmoji.emojify(text) : text}</p>
                    </div>
                </div>
            )
    )
}

export default Message