import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiThumbsUp } from "react-icons/fi";
import ChatList from "../components/ChatList";
import { useAuth } from "../components/Context/auth";
import Layout from "../components/layout/Layout";
import "../Styles/style.css";

const HomePage = () => {
  const [Posts, setPosts] = useState([]);
  const [auth] = useAuth();

  //--- Get all Posts ----//
  const getAllPosts = async () => {
    try {
      const { data } = await axios.get("/api/v1/post/get/allPosts");
      setPosts(data.Posts);
      console.log(data);
      console.log(data.Posts.photo);
    } catch (error) {
      console.error("Error while fetching posts:", error);
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllPosts();
  }, []);

  const bufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  return (
    <Layout>
       
      <div className="main-container">
        
        
        <div className="Post-container">
          {Posts.map((p) => {
            if (p.photo && p.photo.data && p.photo.contentType) {
              // Convert the buffer to base64
              const base64String = bufferToBase64(p.photo.data.data);
              const imgSrc = `data:${p.photo.contentType};base64,${base64String}`;

              return (
                <div className="card" key={p._id} style={{ width: "25rem", height:"30rem", marginTop:"3rem", backgroundColor:"black", overflow: "hidden", boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)" }}>
                  <img src={imgSrc} className="card-img-top" alt="Post Image" style={{ height: "25rem", width: "100%", objectFit: "contain" }}/>
                  <div className="card-body">
                    <h5 className="card-title">{p.description}</h5>
                      <span>{p.totallikes} <FiThumbsUp /></span>
                      <span>{p.hashtag}</span>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <ChatList />
      </div>
    </Layout>
  );
};

export default HomePage;
