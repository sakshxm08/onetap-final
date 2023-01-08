import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Firebase } from "../../firebase/config";
import Logo from "../../onetap_logo.png";
import RoundLoading from "../Loading/RoundLoading";
import "./Login.css";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <>
      {loading && <RoundLoading />}
      <div>
        <div className="loginParentDiv">
          <img width="200px" height="200px" src={Logo} alt=""></img>
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label>Email</label>
            <br />
            <input
              className="input"
              type="email"
              placeholder="abc@xyz.com"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label>Password</label>
            <br />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <div className="buttons">
              <button className="button">Login</button>
            </div>
            <div className="signupDiv">
              <Link to="/signup" className="signupLink">
                New to OneTap? Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
