import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../onetap_logo.png";

import "./Signup.css";
import { Firebase } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import SignUpLoading from "../Loading/SignUpLoading";

export default function Signup() {
  const navigate = useNavigate();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({ displayName: name }).then(() => {
          Firebase.firestore().collection("users").doc(result.user.uid).set({
            id: result.user.uid,
            name: name,
            phone: phone,
          });
        });
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        alert(error.message);
        window.location.reload();
      });
  };
  return (
    <>
      {loading && <SignUpLoading />}{" "}
      <div className="signupMainDiv">
        <div className="signupParentDiv">
          <img
            width="200px"
            height="200px"
            className="sideLogo"
            src={Logo}
            alt=""
          ></img>
          <form onSubmit={handleSubmit}>
            <img
              width="100px"
              height="100px"
              className="topLogo"
              src={Logo}
              alt=""
            ></img>
            <div className="signupHr"></div>
            <h1>Register</h1>
            <span className="label">Full Name</span>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
            />
            <br />
            <span className="label">Email</span>
            <br />
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            <br />
            <span className="label">Phone</span>
            <br />
            <input
              className="input"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              name="phone"
            />
            <br />
            <span className="label">Password</span>
            <br />
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            <br />
            <br />
            <div className="buttons">
              <button className="button">Register</button>
            </div>
            <div className="loginDiv">
              <Link to="/login" className="loginLink">
                Already an user? Login to OneTap
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
