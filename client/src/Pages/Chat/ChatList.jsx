import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/Context/auth";

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
            console.log(response.data.conversation);
          }
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchConversation();
  }, [userId]);

//-------------------------//
//     get the user
const getUser = async (userId) => {
  try {
    const userId = userId;
    const user = await axios.get(`/api/v1/user/finduserbyid/${userId}`) 
  } catch (error) {
    console.log(error);
  }
}  

  return (
    <div>
      <h2>Your Chats</h2>
      <h3>{auth?.user?.email}</h3>
      <h3>Members</h3>
      <div>
        {conversation.length > 0 ? (
          conversation.map((conv) => (
            <div key={conv._id}>
              <p>Conversation ID: {conv._id}</p>
              {conv.members.map((member, index) => (
                <div key={index}>Member {index + 1}: {member}</div>
              ))}
            </div>
          ))
        ) : (
          <p>No conversations found.</p>
        )}
      </div>
    </div>
  );
};

export default ChatList;
