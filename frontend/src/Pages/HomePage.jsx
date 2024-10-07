import axios from "axios";
import React, { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";

const HomePage = () => {
  const [Posts, setPosts] = useState([]);

  //--- Get all Posts ----//
  const getAllPosts = async () => {
    try {
      const { data } = await axios.get("/api/v1/post/get/allPosts");
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

  return (
    <>
      <Header />
      <div className="main-container">
        <Sidebar />
        <h1>Home page here lksd</h1>
        <div className="Post-container">
          {Posts.map((p) => (
            <div className="card" style={{ width: "18rem" }}>
          <img src={p.photo} className="card-img-top" alt="nothing" />
            <div className="card-body">
              <h5 className="card-title">{p.description}</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              
            </div>
          </div>
          ))}
        </div>
        <ChatList />
      </div>
    </>
  );
};

export default HomePage;
