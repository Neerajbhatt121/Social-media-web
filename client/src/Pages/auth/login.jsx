import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/Context/auth";


const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [auth, setAuth] = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login', {
                email,
                password,
            })
            if(res && res.data.sucess){
                toast.success(res && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem("Social-auth", JSON.stringify(res.data));
                console.log("Navigating to:", location.state || '/');
                navigate(location.state || '/');
                console.log("done")
            } else {
                console.log("here")
                toast.error(res.data.message);
              }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }

  return (
    <div
      className="register"
      style={{
        width: "30vw",
        border: "1px solid black",
        marginTop: "40px",
        marginLeft: "35%",
      }}
    >
      <h1>Login</h1>
      <form onSubmit={handleSubmit} > 
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
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
       <button type="submit" className="btn btn-outline-secondary">Login</button>
       <button class='btn btn-outline-secondary' onClick={() => navigate('/register')}>SignUp</button>

      </form>
    </div>
  );
};

export default Login;
