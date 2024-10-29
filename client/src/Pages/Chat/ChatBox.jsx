import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

useEffect(() => {
    const fetchMessages = async() => {
        
        try {
            const response = await axios.get(`/api/v1/message/getmessages/${chatId}`)
            setMessage(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    fetchMessages();
},[chatId])

  return (
    <Layout>
      <div className='chatbox-main'>
          {message.map((m) => {
            const time = new Date(m.timestamp).toLocaleDateString([], {
              hour: '2-digit',
              minute: '2-digit'
            });
            return (
              <div className='chats-container'>
                {m.senderId === auth?.user?.id ? (
                <div className='msgbyme'>
                    {m.text} {time}
                </div>
            ) : (
              <div className='msgbyyou'>
                {m.text}  
              </div>
            )}
              </div>
            )
          })}
      </div>
     
    </Layout>
  )
}

export default ChatBox
