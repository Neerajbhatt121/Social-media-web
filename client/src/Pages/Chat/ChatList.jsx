import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../components/Context/auth';

const ChatList = ({ selectConversation }) => {
    const [conversation, setConversation] = useState([]);
    const [auth] = useAuth();

   
    const userId = auth?.user?.id; 

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                if (userId) {
                    const response = await axios.get(`/api/v1/chats/conv/${userId}`);
                    console.log(response);

                    if (response.data && response.data.conversation) {
                        setConversation(response.data.conversation);
                    }
                } else{
                  console.log("not found user")
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchConversation();
    }, [userId]);

    return (
        <div>
            <h2>Your Chats</h2>
            <h3>{auth?.user?.email}</h3> 
            <h3></h3>
            <div>
                {conversation.map((conv) => (
                    <div key={conv._id}>
                        {conv.members[1]}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatList;
