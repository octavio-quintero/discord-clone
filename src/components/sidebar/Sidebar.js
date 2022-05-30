import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from '../sidebar-channel/SidebarChannel';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CallIcon from '@mui/icons-material/Call';
import { Avatar } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import HeadsetIcon from '@mui/icons-material/Headset';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/UserSlice';
import { auth, db } from '../../firebase';
import { addDoc, collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';

function Sidebar() {

  const user = useSelector(selectUser)
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'channels'), orderBy('created','asc'));
    onSnapshot(q, (querySnapshot) => {
      setChannels(querySnapshot.docs.map( doc => ({
        id: doc.id,
        channel: doc.data()
      })))
    })
  })

  const handleAddChannel = async(e) => {
    const channelName = prompt("Enter a new channel name");
    if(channelName){
      e.preventDefault()
      try{
        await addDoc(collection(db, 'channels'), {
          channelName: channelName,
          created: Timestamp.now()
        })
      }catch(err){
        alert(err)
      }
    }
  }

  return (
    <div className='sidebar'>
      <div className="sidebar__top">
        <h3>Servers</h3>
        <ExpandMoreIcon/>
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon/>
            <h4>Text Channel</h4>
          </div>

          <AddIcon className='sidebar__addChannel' onClick={handleAddChannel}/>
        </div>

        <div className="sidebar__channelsList">
          {
            channels.map(({id, channel}) => (
              <SidebarChannel key={id} id={id} channel={channel.channelName} />
            ))
          }
        </div>
      </div>

      <div className="sidebar__voice">
          <SignalCellularAltIcon
              className='sidebar__voiceIcon'
              fontSize='large' 
            />
            <div className="sidebar__voiceInfo">
                <h3>Voice connected</h3>
                <p>Stream</p>
            </div>

            <div className="sidebar__voiceIcons">
              <InfoOutlinedIcon/>
              <CallIcon />
            </div>
      </div>

      <div className="sidebar__profile">
          <Avatar src={user.photo} onClick={() => {auth.signOut()}}/>
          <div className="sidebar__profileInfo">
            <h3>{user.displayName}</h3>
            <p>#{user.uid.substring(0,6)}</p>
          </div>
          <div className="sidebar_profileIcons">
            <MicIcon/>
            <HeadsetIcon/>
            <SettingsIcon />
          </div>
      </div>
    </div>
  )
}

export default Sidebar