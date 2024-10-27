import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const ChatBox = () => {
    const [message, setMessage] = useState([]);
    const [text, settext]= useState();
    const location = useLocation();
    const chatId = location.state;

useEffect(() => {
    const fetchMessages = async() => {
        
        try {
            const response = await axios.get(`/api/v1/message/getmessages/${chatId}`)
            console.log(response.data[0].text)
            setMessage(response.data[0].text)
        } catch (error) {
            console.log(error);
        }
    }
    fetchMessages();
},[chatId])

  return (
    <Layout>
      <div className='chatbox-main'>
          {message}
      </div>
     
    </Layout>
  )
}

export default ChatBox
