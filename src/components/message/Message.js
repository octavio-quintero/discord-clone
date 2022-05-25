import { Avatar } from '@mui/material'
import React from 'react'
import './Message.css'

function Message() {
  return (
    <div className="message">
        <Avatar/>
        <div className="message__info">
            <h4>
                Octavio
                <span className="message__timestamp">Today at 12:00 PM</span>
            </h4>
            <p>This is the message</p>
        </div>
    </div>
  )
}

export default Message