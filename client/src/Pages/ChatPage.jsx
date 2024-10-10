import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ChatPage = () => {

const [chats, setChats] = useState([]);
const fetchChats = async () => {
  const {data} = await axios.get('/api/v1/chat')
  setChats(data);
  console.log(data);
  console.log("nothing");
}

useEffect(() =>{
  fetchChats();
}, []); 

  return (
    <div>
        <h1>Chat page here</h1>
        <h1>{chats.map(
          chat => <div>{chat}</div>
        )}</h1>
    </div>
  )
}

export default ChatPage
