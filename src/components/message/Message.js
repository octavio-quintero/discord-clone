import { Avatar } from '@mui/material'
import React from 'react'
import './Message.css'

function Message({user, message}) {
  console.log(message)
  return (
    <div className="message" >
        <Avatar src={user.photo}/>
        <div className="message__info">
            <h4>
                {user.displayName}
                <span className="message__timestamp">{new Date(message.timestamp.toDate()).toUTCString()}</span>
            </h4>
            <p>{message.message}</p>
        </div>
    </div>
  )
}

export default Message