import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { IoSend } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client'; // Import Socket.IO client
import { useAuth } from '../../components/Context/auth';
import Layout from '../../components/layout/Layout';
import "../../Styles/chatstyle.css";

const ChatBox = () => {
    const [message, setMessage] = useState([]);
    const [text, settext] = useState("");
    const location = useLocation();
    const chatId = location.state; // Chat room ID
    const [auth] = useAuth();
    const chatHolderRef = useRef(null);
    const socket = useRef(null); // Ref to store the socket instance

    // Connect to Socket.IO server
    useEffect(() => {
        socket.current = io('http://localhost:5000'); // Replace with your server URL
        socket.current.emit('joinRoom', chatId); // Join the chat room

        // Receive messages from the server
        socket.current.on('receiveMessage', (data) => {
            setMessage((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.current.disconnect(); // Clean up on unmount
        };
    }, [chatId]);

    // Fetch existing messages on component load
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`/api/v1/message/getmessages/${chatId}`);
                setMessage(response.data.reverse());
            } catch (error) {
                console.log(error);
            }
        };
        fetchMessages();
    }, [chatId]);

    // Scroll to bottom when messages are updated
    useEffect(() => {
        if (chatHolderRef.current) {
            chatHolderRef.current.scrollTop = chatHolderRef.current.scrollHeight;
        }
    }, [message]);

    // Handle sending messages
    const handleSendMessage = async () => {
        if (!text.trim()) return; // Avoid sending empty messages

        if (!auth?.user?.id) {
            console.error("User is not authenticated!");
            return;
        } else{
            console.log("done")
        }

        const newMessage = {
            chatId,
            senderId: auth?.user?.id,
            text,
        };

        try {
            // Save the message to the database
            await axios.post(`/api/v1/message/createMessage/${chatId}`, newMessage);

            // Send the message to the server via Socket.IO
            socket.current.emit('sendMessage', newMessage);

            // Clear input field
            settext("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className='chatbox-main'>
                <div>user ka name idhar</div>
                <div className='chat-holder' ref={chatHolderRef}>
                    {message.map((m) => {
                        const time = new Date(m.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        });
                        return (
                            <div key={m._id || Math.random()} className='chats-container'>
                                <div className={m.senderId === auth?.user?.id ? 'msgbyme' : 'msgbyyou'}>
                                    {m.text} <span>{time}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className='send-message'>
                    <input
                        value={text}
                        placeholder='Message....'
                        onChange={(e) => settext(e.target.value)}
                    />
                    <div>
                    <IoSend  style={{ color: "green", fontSize: '32px', marginLeft: "5px"}} onClick={handleSendMessage} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ChatBox;
