import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiThumbsUp } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Context/auth";
import Layout from "../components/layout/Layout";
import "../Styles/style.css";
import ChatList from "./Chat/ChatList";

const HomePage = () => {
  const [Posts, setPosts] = useState([]);
  const [auth, setAuth] = useAuth();
  const [like, setLike] = useState(false)
  const [spinner, setSpinner] =useState(false)
  const [page, setPage] = useState(1);
  const navigate = useNavigate()

  //--- Get all Posts ----//
  const getAllPosts = async () => {
    try {
      setSpinner(true)
      const { data } = await axios.get(`/api/v1/post/get/getControllPost/${page}`);
      if(data?.success){
        setSpinner(false)
        console.log("hello")
      }
      setPosts(data.Posts);
      console.log(data);
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

  //----------------//
  // handle Select conversation
  const handleSelectConversation = (conversationId, members) => {
    navigate('/ChatBox', {state: conversationId})
  };


  useEffect(() => {
    if(page == 1) return
    LoadMore()
  },[page])

  const LoadMore = async () => {
    try {
      const { data } = await axios.get(`/api/v1/post/get/getControllPost/${page}`);
      if(data?.success){
        console.log("hello")
      }
      setPosts([...Posts, ...data?.Posts]);
      console.log(data);
    } catch (error) {
      console.error("Error while fetching posts:", error);
    }
  }


  const handleLiked = async () => {
      try {
        
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div>
      {auth?.token ? (
        <Layout>
            
        <div className="main-container">
        {spinner && (
            <div className="spinner-border text-light align-self-center " role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
          )}
          <div>
          <div className="Post-container">
            {Posts.map((p) => {
              if (p.photo && p.photo.data && p.photo.contentType) {
                // Convert the buffer to base64
                const base64String = bufferToBase64(p.photo.data.data);
                const imgSrc = `data:${p.photo.contentType};base64,${base64String}`;
  
                return (
                  <div className="card" key={p._id} style={{ width: "27rem", height:"38rem",color:"gray" ,marginTop:"3rem", backgroundColor:"black", overflow: "hidden", boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)" }}>
                    <img src={imgSrc} className="card-img-top" alt="Post Image" style={{ height: "27rem", width: "100%", objectFit: "contain" }}/>
                    <div className="card-body">
                      <h5 className="card-title">{p.description}</h5>
                        <span >{p.totallikes} <FiThumbsUp Likes onClick={handleLiked}/></span>
                        <span>{p.hashtag}</span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
            <div className="m-3 p-3">
            <button
                style={{height:"30px", background:"yellow"}}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                Loadmore...
              </button>
            </div>
          </div>
          
          <ChatList selectConversation={handleSelectConversation} />
        </div>
      </Layout>
      ) : (
        navigate("/login")
      )}
    </div>
  );
};

export default HomePage;
