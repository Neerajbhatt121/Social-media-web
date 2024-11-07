import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/Group.png";
import { useAuth } from "../../components/Context/auth";
import '../../Styles/chatStyle.css';

const ChatList = ({ selectConversation }) => {
  const [conversations, setConversations] = useState([]);
  const [auth] = useAuth();
  const [users, setUsers] = useState({});
  const userId = auth?.user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        if (userId) {
          const response = await axios.get(`/api/v1/chats/conv/${userId}`);
          console.log(response);

          if (response.data && response.data.conversation) {
            setConversations(response.data.conversation); // Store kar rahe hai entire conversation data
            console.log("here the result", response.data.conversation);
            response.data.conversation.forEach((conv) => {
              conv.members.forEach((memberId) => getUser(memberId)); // Fetch each user's details
            });
          }
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchConversations();
  }, [userId]);

  const getUser = async (memberId) => {
    try {
      if (!users[memberId]) {
        const response = await axios.get(`/api/v1/user/finduserbyid/${memberId}`);
        const user = response.data.user;
        setUsers((prevUsers) => ({
          ...prevUsers,
          [memberId]: user,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

//----------------//
  // handle Select conversation
  const handleSelectConversation = (conversationId, members) => {
    console.log("Selected conversation ID:", conversationId);
    console.log("Members:", members);
    navigate('/ChatBox', {state: conversationId})
  };

  return (
    <div className="chatlist-col">
    <h2>Your Chats</h2>
    <h3>{auth?.user?.email}</h3>
    <div>
      {conversations.length > 0 ? (
        conversations.map((conv) => {
          const memberId = conv.members[1]; // keval pehla member hi
          return (
            <div key={conv._id} onClick={() => handleSelectConversation(conv._id, conv.members)}>
              <div className="chatlist-item">
                {users[memberId] ? (
                  <>
                    <img
                      src={users[memberId].profilePicture || defaultImage}
                      alt="Profile"
                      style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                    />
                    <div>
                      <div>Username: {users[memberId].username}</div>
                      <div>Name: {users[memberId].name}</div>
                    </div>
                  </>
                ) : (
                  <p>Loading user details...</p>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p>No conversations found.</p>
      )}
    </div>
  </div>

  );
};

export default ChatList;
