import React from 'react';
import { BsSend } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { IoIosSearch, IoMdHome } from "react-icons/io";
import { MdExplore } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import logo from "../assets/Group.png";
import { useAuth } from './Context/auth';

const Sidebar = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  return (
    <div className='sidebar-main'>
         <h3><img src={logo} alt="" onClick={() => navigate('/')}/> PHOTONET</h3>

    <span style={{ width:"70%" }}>
      <div  onClick={() => navigate('/')}><IoMdHome style={{ color: "purple", fontSize: '35px'}}/> Home</div>
      <div><IoIosSearch style={{ color: "purple", fontSize: '35px'}} /> Search</div>
      <div><MdExplore  style={{ color: "purple", fontSize: '35px'}} /> Explore</div>
      <div><BsSend  style={{ color: "purple", fontSize: '30px'}} /> Message</div>
      <div><FaRegHeart style={{ color: "purple", fontSize: '30px' }}/> Notification</div>
      <div className='Profile' onClick={() => navigate('/profile')}><CgProfile style={{ color: "purple", fontSize: '25px' }} />Profile</div>
    </span>

    </div>
  )
}

export default Sidebar
