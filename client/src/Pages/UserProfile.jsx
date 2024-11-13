import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/Context/auth';
import Sidebar from '../components/sidebar';
import '../Styles/Profile.css';
import '../Styles/style.css';

const UserProfile = () => {
    const [auth] = useAuth();
    const [name, setname] = useState("");
    const [username, setusername] = useState();
    const [Post, setPost] = useState([]);

    useEffect(() => {
        if(auth?.user) {
            console.log(auth)
            const {name , username} = auth?.user;
            setname(name || "ExampleName");
            setusername(username || "DefaultUser");         
        }
    }, [auth])

//---------------------//
const bufferToBase64 = (buffer) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};


console.log(auth?.user?.id)
    const GetUserInfo = async() => {
      try {
         if(auth?.user?.id){
          const response = await axios.get(`/api/v1/post/get/user-posts/${auth?.user?.id}`)
            console.log("hjsfdf",response)
            console.log("data", response)
            setPost(response)
            console.log("dataPost",Post?.data?.Posts)
             
         }
      } catch (error) {
        console.log(error)
      }
    }

  useEffect(() => {
      GetUserInfo()
  },[auth])

  return (
    <div className='profile-main'>
    <Sidebar/>
    <div className="Profile_main_container" style={{marginLeft:"15vw"}}>
      <div className='dp'></div>
      <div className='Profile_info_count'>
          <div >  
              <div>Posts</div>
              <div>{Post?.data?.Posts?.length}</div>
          </div>
          <div>
              <div>Friends</div>
              <div>{Post.friends ? Post.friends : 0}</div>
          </div>
      </div>
    </div>
    <div className='Profile_body_container'>
    <div className='post-container'>
              {Post.data.Posts.map((p) => {
            if (p.photo && p.photo.data && p.photo.contentType) {
              // Convert the buffer to base64
              const base64String = bufferToBase64(p.photo.data.data);
              const imgSrc = `data:${p.photo.contentType};base64,${base64String}`;

              return (
                <div className="card" key={p._id} style={{ width: "12rem", height:"12rem",color:"gray" ,marginTop:"0.5rem", backgroundColor:"black", overflow: "hidden" }}>
                  <img src={imgSrc} className="card-img-top" alt="Post Image" style={{ height: "auto", width: "12rem", objectFit: "contain" }}/>
                  <div className="card-body">
                  </div>
                </div>
              );
            }
          })}
              </div>
        </div>

    </div>
  )
}

export default UserProfile
