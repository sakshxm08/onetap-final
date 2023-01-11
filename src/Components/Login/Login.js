import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Firebase } from "../../firebase/config";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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
  // -------------------GOOGLE LOGIN----------------------- //
  // const googleLogin = (e) => {
  //   e.preventDefault();

  //   const provider = new GoogleAuthProvider();
  //   const auth = getAuth();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       navigate("/");
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       console.log(token);
  //       // The signed-in user info.
  //       const user = result.user;
  //       console.log(user);
  //       // ...
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       console.log(errorCode);
  //       const errorMessage = error.message;
  //       console.log(errorMessage);
  //       // The email of the user's account used.
  //       // const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       // const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // };
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
            {/* <div className="buttons">
              <button className="button" onClick={googleLogin}>
                Login with Google
              </button>
            </div> */}

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
