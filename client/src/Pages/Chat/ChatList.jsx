import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/Context/auth";

const ChatList = ({ selectConversation }) => {
  const [conversation, setConversation] = useState([]);
  const [auth] = useAuth();
  const [users, setUsers] = useState({}); 
  const userId = auth?.user?.id;

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        if (userId) {
          const response = await axios.get(`/api/v1/chats/conv/${userId}`);
           console.log(response);

          if (response.data && response.data.conversation) {
            setConversation(response.data.conversation[0].members);
            console.log(response.data.conversation[0].members);

            // Fetch user details for each memberId (friend)
            response.data.conversation[0].members.forEach((memberId) => {
              getUser(memberId);
                console.log(memberId)
                console.log(users)
            });
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
const getUser = async (memberId) => {
    try {
      if (!users[memberId]) {
        const response = await axios.get(`/api/v1/user/finduserbyid/${memberId}`);
        const user = response.data.user;
          console.log(response.data)
        setUsers((prevUsers) => ({
          ...prevUsers,
          [memberId]: user, 
        }));
        console.log(users)
      }
    } catch (error) {
      console.log(error);
    }
  }; 

  return (
    <div>
      <h2>Your Chats</h2>
      <h3>{auth?.user?.email}</h3>
      <h3>Members</h3>
      <div>
        {conversation.length > 0 ? (
          conversation.map((memberId) => (
            <div key={memberId}>
            {users[memberId] ? (
              <div>
                {/* Display user details once fetched */}
                <img
                  src={users[memberId].profilePicture || ""}
                  alt="Profile"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
                <p>Username: {users[memberId].username}</p>
                <p>Name: {users[memberId].name}</p>
                <p>Email: {users[memberId].email}</p>
              </div>
            ) : (
              <p>Loading user details...</p> // Show loading while fetching
            )}
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
