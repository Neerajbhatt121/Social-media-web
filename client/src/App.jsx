import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/auth/login.jsx";
import Register from "./Pages/auth/register.jsx";
import ChatList from "./Pages/Chat/ChatList.jsx";
import ChatPage from "./Pages/ChatPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import UserProfile from "./Pages/UserProfile.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/chatlist"  element={<ChatList/>} />
        <Route path="/profile"  element={<UserProfile/>} />
      </Routes>
    </>
  );
}

export default App;
