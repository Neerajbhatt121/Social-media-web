import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatPage from "./Pages/ChatPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import Login from "./Pages/auth/login.jsx";
import Register from "./Pages/auth/register.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </>
  );
}

export default App;
