import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { IoSend } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../components/Context/auth';
import Layout from '../../components/layout/Layout';
import "../../Styles/chatstyle.css";

const ChatBox = () => {
    const [message, setMessage] = useState([]);
    const [text, settext]= useState();
    const location = useLocation();
    const chatId = location.state;
    const [auth] = useAuth();
    const chatHolderRef = useRef(null);

useEffect(() => {
    const fetchMessages = async() => {
        try {
            const response = await axios.get(`/api/v1/message/getmessages/${chatId}`)
            setMessage(response.data.reverse())
        } catch (error) {
            console.log(error);
        }
    }
    fetchMessages();
},[chatId])

useEffect(() => {
  // Scroll to bottom when messages are updated
  if (chatHolderRef.current) {
      chatHolderRef.current.scrollTop = chatHolderRef.current.scrollHeight;
  }
}, [message]);


//-------------------------//
//  handleSendMessage
const handleSendMessage = async () => {
  try {
    const response = await axios.post(`/api/v1/message/createMessage/${chatId}`, {
        chatId: chatId,
        senderId: auth?.user?.id,
        text: text
    })
  } catch (error) {
    console.log(error);
  }
}


  return (
    <Layout>
      <div className='chatbox-main'>
        <div>user ka name idhar</div>
          <div className='chat-holder'>
          {message.map((m) => {
            const time = new Date(m.timestamp).toLocaleDateString([], {
              hour: '2-digit',
              minute: '2-digit'
            });
            return (
              <div className='chats-container'>
                  <div className={m.senderId === auth?.user?.id ? ('msgbyme') : ('msgbyyou')}>
                    {m.text}  <span>{time}</span>
                </div>
              </div>
            )
          })}
          </div>
          <div className='send-message'>
                  <input value={text} placeholder='Message....' onChange={(e) => settext(e.target.value)}  />
                  <div><IoSend  style={{ color: "green", fontSize: '32px', marginLeft: "5px"}} onClick={handleSendMessage} /></div>
              </div>
      </div>
    </Layout>
  )
}

export default ChatBox
