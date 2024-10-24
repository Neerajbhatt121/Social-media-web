import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [name, setName] = useState("");
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();


//-----------------------//
// Handle Submit 
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const res = await axios.post('/api/v1/auth/register', {
            name,
            username,
            email,
            password,
            answer,
        });
        console.log("register done")
        if(res && res.data.success){
            navigate('/login');
        } else {
            console.log("not login exist")
        }

    } catch (error) {
        console.log(error);
        console.log("Something went wrong while register")
    }
}

  return (
    <div className="register" style={{width:"30vw", border:"1px solid black", marginTop:"40px", marginLeft:"35%" }}>
    <h1>Register</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required00
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail2"
          aria-describedby="emailHelp"
          placeholder="Enter your username"
          onChange={(e) => setusername(e.target.value)}
          value={username}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail2"
          aria-describedby="emailHelp"
          placeholder="Enter your email"
          onChange={(e) => setemail(e.target.value)}
          value={email}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword3"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail4"
          aria-describedby="emailHelp"
          placeholder="Secret key / favorite food"
          onChange={(e) => setAnswer(e.target.value)}
          value={answer}
          required
        />
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" class="btn btn-secondar"
      >Register</button>
    </form>
  </div>
  )
}

export default Register
