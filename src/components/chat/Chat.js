import React, { useEffect, useRef, useState } from 'react'
import ChatHeader from '../chat-header/ChatHeader'
import './Chat.css'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Message from '../message/Message';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/UserSlice';
import { selectChannelId, selectChannelName } from '../../features/AppSlice';
import { addDoc, collection, doc, Timestamp, onSnapshot, orderBy, query} from 'firebase/firestore';
import { db } from '../../firebase';

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)

  useEffect(() => {
      if(channelId){
       
        const q = query(collection(db, 'channels', channelId, 'messages'), orderBy('timestamp','asc'))
        onSnapshot(q, (querySnapshot) => {
          setMessages(
          querySnapshot.docs.map(doc => (
            {
              id:doc.id,
              message: doc.data()
            }
            ))
            );
            
          })
      }
      
  }, [channelId])

  useEffect(() => { scrollDown(messagesEndRef) }, [messages])

  const sendMessage = async (e) => {
    e.preventDefault();
    
    const docRef = doc(db, "channels", channelId);
    const colRef = collection(docRef, "messages")
    addDoc(colRef, {
      message:input,
      user:user,
      timestamp: Timestamp.now()
    });
    /*const channel = query(collection(db, 'channels'), where("channelName", "==", channelName));
    const querySnapshot = await getDocs(channel)

    try{
      await addDoc(querySnapshot.collection("messages"), {
        message:input,
        user:user,
        timestamp: serverTimestamp
      })
    }catch(err){
      alert(err)
    }*/
    setInput("")
  }

  /*const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    
  }*/
  const scrollDown = (ref) => {
    /*window.scrollTo({
      top: 0,
        behavior: 'smooth',
    });*/
    
    /*window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth',
    });*/

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  };

  return (
      <div className="chat">
          <ChatHeader channelName={channelName} />

          <div className="chat__messages">
            {
              messages.map(({id, message}) => (
                <Message 
                    key={id}
                    user={message.user}
                    message={message}/>
              ))
            }
            <div ref={messagesEndRef} />
          </div>

          <div className="chat__input">
             <AddCircleIcon fontSize='large' />
             <form>
                 <input
                  value={input}
                  disabled={!channelId}
                  onChange={(e) => setInput(e.target.value)} 
                  placeholder={`Message #${channelName}`} />

                 <button className='chat__inputButton'
                  disabled={!channelId} 
                  onClick={sendMessage}
                  type='submit'>
                    Send Message
                 </button>
             </form>

             <div className="chat__inputIcons">
                 <CardGiftcardIcon fontSize='large' />
                 <GifIcon fontSize='large' />
                 <EmojiEmotionsIcon fontSize='large' />
             </div>
          </div>
      </div>
  )
}

export default Chat