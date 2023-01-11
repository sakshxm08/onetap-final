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
      <div className="loginMainDiv">
        <div className="loginParentDiv">
          <Link to="/">
            <img
              width="200px"
              height="200px"
              className="sideLogo"
              src={Logo}
              alt=""
            ></img>
          </Link>
          <form onSubmit={handleSubmit}>
            <Link to="/">
              <img
                width="100px"
                height="100px"
                className="topLogo"
                src={Logo}
                alt=""
              ></img>
            </Link>

            <div className="loginHr"></div>
            <h1>Login</h1>
            <span className="label">Email</span>
            <br />
            <input
              className="input"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <span className="label">Password</span>
            <br />
            <input
              className="input"
              type="password"
              name="password"
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
