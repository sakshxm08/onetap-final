import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AllPostContext } from "../../contextStore/AllPostContext";
import { PostContext } from "../../contextStore/PostContext";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import SearchIcon from "@mui/icons-material/Search";
// import Arrow from "../../assets/Arrow";
// import SellButton from "../../assets/SellButton";
// import SellButtonPlus from "../../assets/SellButtonPlus";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contextStore/AuthContext";
import { Firebase } from "../../firebase/config";
import Search from "../Search/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import Menubar from "../Menubar/Menubar";
function Header(props) {
  const { allPost } = useContext(AllPostContext);
  const { setPostContent } = useContext(PostContext);
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = allPost.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  const handleSelectedSearch = (value) => {
    setPostContent(value);
    navigate("/view");
  };
  const handleEmptyClick = () => {
    alert("No items found. Please search by product name.");
  };
  const { user } = useContext(AuthContext);

  const logoutHandler = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        navigate("/login");
      });
  };
  const enableScroll = () => {
    window.onscroll = function () {};
  };
  const showSearchBar = () => {
    enableScroll();
    document.getElementById("searchBar").classList.toggle("showSearchBar");
    document.getElementById("searchIcon").classList.toggle("hideIcon");
    document.getElementById("dropUpIcon").classList.toggle("showIcon");
    if (
      document
        .getElementById("menubarMainDiv")
        .classList.contains("showMenubar")
    ) {
      document.getElementById("menubarMainDiv").classList.remove("showMenubar");
    }
    if (document.getElementById("closeicon").classList.contains("showIcon")) {
      document.getElementById("closeicon").classList.remove("showIcon");
    }
    if (document.getElementById("menuicon").classList.contains("hideIcon")) {
      document.getElementById("menuicon").classList.remove("hideIcon");
    }
  };

  return (
    <>
      <nav className="headerParentDiv">
        <div className="headerChildDiv">
          <div className="brandName">
            <OlxLogo></OlxLogo>
          </div>
          <div className="searchDivHeader">
            <div className="placeSearch">
              <div className="search2">
                <div className="placeSearchInput">
                  <input
                    type="text"
                    placeholder="Search specific product..."
                    value={wordEntered}
                    onChange={handleFilter}
                  />
                  {filteredData.length === 0 ? (
                    <div className="searchIcon">
                      <div onClick={handleEmptyClick}>
                        {" "}
                        <SearchIcon fontSize="small" />{" "}
                      </div>
                    </div>
                  ) : (
                    <div id="clearBtn" onClick={clearInput}>
                      {" "}
                      <ClearOutlinedIcon fontSize="large" />
                    </div>
                  )}
                </div>
                {filteredData.length !== 0 && (
                  <div className="dataResult-header">
                    {filteredData.slice(0, 15).map((value, key) => {
                      return (
                        <div
                          key={key}
                          className="dataItem-header"
                          onClick={() => handleSelectedSearch(value)}
                        >
                          <p>{value.name} </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="productSearch">
              <Search />
            </div>
          </div>
          {/* <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div> */}
          <div className="buttonsHeader">
            <div className="loginPage">
              {user ? (
                <>
                  <i
                    class="fa-solid fa-user pr-2 userIcon"
                    style={{ color: "white" }}
                  ></i>
                  <span className="username">
                    {`${user.displayName.slice(
                      0,
                      user.displayName.indexOf(" ")
                    )}`}
                  </span>
                </>
              ) : (
                <Link to="/login">
                  <span className="loginLinkHeader">
                    <LoginIcon />
                    <span>Login/Register</span>
                  </span>
                </Link>
              )}
            </div>
            {user && (
              <>
                <span onClick={logoutHandler} className="logout-span">
                  <LogoutIcon />
                  <span>Logout</span>
                </span>
              </>
            )}

            <Link to="/create">
              {/* {" "}
            <div className="sellMenu">
              <SellButton></SellButton>
              <div className="sellMenuContent">
                <SellButtonPlus></SellButtonPlus>
              </div>
            </div> */}
              <button class="headerBtn hover-btn">
                <span className="upload">UPLOAD</span>
                <span className="plusSign">+</span>
              </button>
            </Link>
          </div>
          <div className="menuButtons">
            <div className="searchIconSmall" onClick={showSearchBar}>
              <div id="searchIcon" className="searchicon">
                <SearchIcon fontSize="large" />
              </div>
              <div id="dropUpIcon" className="dropupicon">
                <ArrowDropUpOutlinedIcon fontSize="large" />
              </div>
            </div>
            <Menubar />
          </div>
        </div>
      </nav>
      <div className="searchBar" id="searchBar">
        <Search id="searchComponent" />
      </div>
    </>
  );
}

export default Header;
