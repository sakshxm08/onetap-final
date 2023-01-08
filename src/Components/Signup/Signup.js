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
      <div>
        <div className="signupParentDiv">
          <img width="200px" height="200px" src={Logo} alt=""></img>
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <label>Full Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
            />
            <br />
            <label>Email</label>
            <br />
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            <br />
            <label>Phone</label>
            <br />
            <input
              className="input"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              name="phone"
            />
            <br />
            <label>Password</label>
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
            <button>Register</button>
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
