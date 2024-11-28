import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FiThumbsUp } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Context/auth";
import Layout from "../components/layout/Layout";
import "../Styles/style.css";
import ChatList from "./Chat/ChatList";

const HomePage = () => {
  const [Posts, setPosts] = useState([]);
  const [auth, setAuth] = useAuth();
  const [like, setLike] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [page, setPage] = useState(1);
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  //--- Get all Posts ----//
  const getAllPosts = async () => {
    try {
      setSpinner(true);
      const { data } = await axios.get(
        `/api/v1/post/get/getControllPost/${page}`
      );
      if (data?.success) {
        setSpinner(false);
        console.log("hello");
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
    navigate("/ChatBox", { state: conversationId });
  };

  useEffect(() => {
    if (page == 1) return;
    LoadMore();
  }, [page]);

  const LoadMore = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/post/get/getControllPost/${page}`
      );
      if (data?.success) {
        console.log("skfhjdajs", data);
        setPosts([...Posts, ...data?.Posts]);
        console.log(Posts);
      }
      console.log(data);
    } catch (error) {
      console.error("Error while fetching posts:", error);
    }
  };

  const getPhotoAuthor = async (userId) => {
    try {
      const { data } = await axios.get(`/api/v1/user/finduserbyid/${userId}`);
      setProfile((prev) => ({ ...prev, [userId]: data }));
      console.log("sadfasdf", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLiked = async (postId) => {
    try {
      const { data } = await axios.post(`/api/v1/post/like/${postId}`);
      console.log("okkkkk", data);
      if (data.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? { ...post, totallikes: data.totallikes, likes: !post.likes }
              : post
          )
        );
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div>
      {auth?.token ? (
        <Layout>
          <div className="main-container">
            {spinner && (
              <div
                className="spinner-border text-light align-self-center "
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            <div>
              <div className="Post-container ">
                {Posts.map((p) => {
                  if (p.photo && p.photo.data && p.photo.contentType) {
                    // Convert the buffer to base64
                    const base64String = bufferToBase64(p.photo.data.data);
                    const imgSrc = `data:${p.photo.contentType};base64,${base64String}`;

                    return (
                      <div
                        className="card "
                        key={p._id}
                        style={{
                          border: "0.5px solid white",
                          width: "29rem",
                          height: "42rem",
                          color: "gray",
                          marginTop: "2rem",
                          backgroundColor: "black",
                          overflow: "hidden",
                        }}
                      >
                        <div className="w-100 bg-black h-auto">
                          profile here
                        </div>
                        <img
                          src={imgSrc}
                          className="card-img-top align-self-center"
                          alt="Post Image"
                          style={{
                            height: "auto",
                            width: "100%",
                            objectFit: "contain",
                          }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{p.description}</h5>
                          <span  onClick={() =>handleLiked(p._id)}>{p.totallikes} {p.likes ? (<BiSolidLike />) : (<FiThumbsUp/>)}</span>
                          <span>{p.hashtag}</span>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <div className="m-3 p-3">
                <button
                  style={{ height: "30px", background: "yellow" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  Load more...
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
