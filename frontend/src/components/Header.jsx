import React, { useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaBell, FaRegHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/Group.png";
import "../Styles/style.css";

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="header-main">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search your friends..." />
      </div>

      {!isMobile ? (
        <div className="header-options">
          <span>
          <BsSend  style={{ color: "purple", fontSize: '20px'}} />
          </span>
          <span>
          <CgProfile style={{ color: "purple", fontSize: '20px' }} />
          </span>
          <span>
          <FaBell style={{ color: "purple", fontSize: '20px' }}/>
          </span>
          <span>
          <FaRegHeart style={{ color: "purple", fontSize: '20px' }}/>
          </span>
        </div>
      ) : (
        <div className="dropdown">
          <button
            className="btn"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
              ☰
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li className="nav-item">
              <NavLink className="dropdown-item" to="/">
              <BsSend  style={{ color: "purple" }} /> Chat
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="dropdown-item" to="/">
              <CgProfile style={{ color: "purple" }} /> Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="dropdown-item" to="/">
              <FaBell style={{ color: "purple" }}/> Notification
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="dropdown-item" to="/">
              <FaRegHeart style={{ color: "purple" }}/> Add friend
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
