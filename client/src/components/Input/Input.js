import React, {useEffect, useRef} from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => {
  const chatRef = useRef(null)

  useEffect(() =>{
    chatRef.current.focus()
  }, [message])
  return(
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}
        ref={chatRef}
        tabIndex="-1"
      />
      <button className="sendButton" onClick={(e) => sendMessage(e)}>Send</button>
    </form>
  )
}

export default Input;