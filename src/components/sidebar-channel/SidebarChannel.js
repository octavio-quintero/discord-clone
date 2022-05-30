import React from 'react'
import { useDispatch } from 'react-redux'
import { setChannelInfo } from '../../features/AppSlice';
import './SidebarChannel.css'

function SidebarChannel({id, channel}) {
  const dispatch = useDispatch();
  const handleSetChannel = () => {
    dispatch(setChannelInfo({
      channelId: id,
      channelName: channel
    }))
  }
  return (
    <div className='sidebarChannel' onClick={handleSetChannel}>
        <h4>
            <span className='sidebarChannel__hash'>
                #
            </span>
            {channel}
        </h4>
    </div>
  )
}

export default SidebarChannel