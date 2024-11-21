import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { useAuth } from "../components/Context/auth";
import Sidebar from "../components/Sidebar";
import "../Styles/Profile.css";
import "../Styles/style.css";

const UserProfile = () => {
  const [auth] = useAuth();
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [Post, setPost] = useState([]);
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const ModalRef = useRef();

  useEffect(() => {
    if (auth?.user) {
      const { name, username } = auth.user;
      setname(name || "ExampleName");
      setusername(username || "DefaultUser");
    }
  }, [auth]);

  const bufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const GetUserInfo = async () => {
    try {
      if (auth?.user?.id) {
        const response = await axios.get(
          `/api/v1/post/get/user-posts/${auth.user.id}`
        );
        setPost(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetUserInfo();
  }, [auth]);

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setisDialogOpen(true);
  };

  const handleClosedModal = (e) => {
    if (ModalRef.current === e.target) {
      setSelectedPost(null);
      setisDialogOpen(false);
    }
  };

  return (
    <div className="profile-main">
      <Sidebar />
      <div className="Profile_main_container" style={{ marginLeft: "15vw" }}>
        <div className="dp"></div>
        <div className="Profile_info_count">
          <div>
            <div>Posts</div>
            <div>{Post?.Posts?.length}</div>
          </div>
          <div>
            <div>Friends</div>
            <div>{Post.friends ? Post.friends : 0}</div>
          </div>
        </div>
        <div>
          
            <button
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            ><IoMdMenu />
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
            </ul>
          
        </div>
      </div>

      <div className="Profile_body_container">
        <div className="post-container">
          {Post?.Posts?.map((p) => {
            if (p.photo && p.photo.data && p.photo.contentType) {
              const base64String = bufferToBase64(p.photo.data.data);
              const imgSrc = `data:${p.photo.contentType};base64,${base64String}`;

              return (
                <div
                  className="card"
                  key={p._id}
                  style={{
                    width: "12rem",
                    height: "12rem",
                    color: "gray",
                    marginTop: "0.5rem",
                    backgroundColor: "black",
                    overflow: "hidden",
                  }}
                  onClick={() => handleOpenModal(p)}
                >
                  <img
                    src={imgSrc}
                    className="card-img-top"
                    alt="Post Image"
                    style={{
                      height: "auto",
                      width: "12rem",
                      objectFit: "contain",
                    }}
                  />
                  <div className="card-body"></div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      {isDialogOpen && (
        <div
          ref={ModalRef}
          onClick={handleClosedModal}
          className="modal-backdrop"
        >
          <div className="modal-content">
            {selectedPost &&
            selectedPost.photo &&
            selectedPost.photo.data &&
            selectedPost.photo.contentType ? (
              <>
                <img
                  src={`data:${
                    selectedPost.photo.contentType
                  };base64,${bufferToBase64(selectedPost.photo.data.data)}`}
                  alt="Full-screen Post"
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
                <h5>{selectedPost.description}</h5>
                <span>{selectedPost.hashtag}</span>
              </>
            ) : (
              <p>No content available for this post.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
