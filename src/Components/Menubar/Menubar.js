import React, { useContext } from "react";
// import Search from "../Search/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TranslateIcon from "@mui/icons-material/Translate";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import userDefault from "../../assets/userDefault.jpg";
import "./Menubar.css";
// import userImg from "./devImg_bg.png";
import { AuthContext } from "../../contextStore/AuthContext";
import { Firebase } from "../../firebase/config";
import { Link, useNavigate } from "react-router-dom";
const Menubar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleToggle = () => {
    console.log("clicked");
    document.getElementById("menubarMainDiv").classList.toggle("showMenubar");
    document.getElementById("closeicon").classList.toggle("showIcon");
    document.getElementById("menuicon").classList.toggle("hideIcon");
    if (
      document.getElementById("searchBar").classList.contains("showSearchBar")
    ) {
      document.getElementById("searchBar").classList.remove("showSearchBar");
    }
    if (document.getElementById("dropUpIcon").classList.contains("showIcon")) {
      document.getElementById("dropUpIcon").classList.remove("showIcon");
    }
    if (document.getElementById("searchIcon").classList.contains("hideIcon")) {
      document.getElementById("searchIcon").classList.remove("hideIcon");
    }
  };
  const disableScroll = () => {
    let scrollTop = document.documentElement.scrollTop;
    let scrollLeft = document.documentElement.scrollLeft;
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  };
  const enableScroll = () => {
    window.onscroll = function () {};
  };
  const logoutHandler = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        navigate("/");
      });
  };

  return (
    <>
      <div className="menubarParentDiv">
        {/* <Search /> */}
        <span className="menubarIcon" id="menubarIcon" onClick={handleToggle}>
          <div className="closeicon" id="closeicon">
            <CloseIcon onClick={enableScroll} />
          </div>
          <div className="menuicon" id="menuicon">
            <MenuIcon onClick={disableScroll} />
          </div>
        </span>
        <div className="menubarMainDiv bottom" id="menubarMainDiv">
          <div className="user">
            <span className="userPhoto">
              <img
                src={
                  user ? (user.photo ? user.photo : userDefault) : userDefault
                }
                className="userImg"
                alt=""
              />
            </span>
            <div className="userDetails">
              {user && <span id="greeting">Hello</span>}

              <span className="username">
                {user ? <>{user.displayName}</> : "Welcome to OneTap"}
              </span>
              <a href="/">
                <span className="userPage">
                  {user
                    ? "View and edit profile"
                    : "Take charge of your buying and selling journey"}
                </span>
              </a>
            </div>
          </div>
          {user ? (
            <div className="optionMenuUser">
              <div className="options">
                <div className="option">
                  <span className="optionIcon">
                    <AddAPhotoIcon />
                  </span>
                  <span className="optionName">Upload</span>
                </div>
                <div className="option">
                  <span className="optionIcon">
                    <AdUnitsIcon />
                  </span>
                  <span className="optionName">My Ads</span>
                </div>
                <div className="option">
                  <span className="optionIcon">
                    <ChatBubbleOutlineIcon />
                  </span>
                  <span className="optionName">Chat</span>
                </div>
                <div className="option">
                  <span className="optionIcon">
                    <NotificationsNoneIcon />
                  </span>
                  <span className="optionName">Notifications</span>
                </div>
              </div>
              <div className="options">
                <div className="option">
                  <div className="optionIcon">
                    <HelpOutlineIcon />
                  </div>
                  <div className="optionName">Help</div>
                </div>
                <div className="option">
                  <div className="optionIcon">
                    <TranslateIcon />
                  </div>
                  <div className="optionName">Select language</div>
                </div>
              </div>
              <div className="options">
                <div className="option">
                  <div className="optionIcon">
                    <SettingsIcon />
                  </div>
                  <div className="optionName">Settings</div>
                </div>
              </div>
              <div className="options">
                <div className="option" onClick={logoutHandler}>
                  <div className="optionIcon">
                    <LogoutIcon />
                  </div>
                  <div className="optionName logoutOption">Logout</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="optionMenuUser">
              <div className="options">
                <div className="option">
                  <span className="optionIcon">
                    <AddAPhotoIcon />
                  </span>
                  <span className="optionName">Upload</span>
                </div>
                <div className="option">
                  <span className="optionIcon">
                    <AdUnitsIcon />
                  </span>
                  <span className="optionName">My Ads</span>
                </div>
                <div className="option">
                  <span className="optionIcon">
                    <ChatBubbleOutlineIcon />
                  </span>
                  <span className="optionName">Chat</span>
                </div>
              </div>
              <div className="options">
                <div className="option">
                  <div className="optionIcon">
                    <HelpOutlineIcon />
                  </div>
                  <div className="optionName">Help</div>
                </div>
                <div className="option">
                  <div className="optionIcon">
                    <TranslateIcon />
                  </div>
                  <div className="optionName">Select language</div>
                </div>
              </div>
              <div className="menubarButtons">
                <Link to="/login">
                  <button className="buttonMenubar">Login/Register</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Menubar;
