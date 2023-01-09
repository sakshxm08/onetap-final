import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AllPostContext } from "../../contextStore/AllPostContext";
import { PostContext } from "../../contextStore/PostContext";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import SearchIcon from "@mui/icons-material/Search";
import Arrow from "../../assets/Arrow";
// import SellButton from "../../assets/SellButton";
// import SellButtonPlus from "../../assets/SellButtonPlus";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contextStore/AuthContext";
import { Firebase } from "../../firebase/config";
import Search from "../Search/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
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

  return (
    <nav className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="searchDivHeader">
          <div className="placeSearch">
            <input
              type="text"
              placeholder="Search specific product..."
              value={wordEntered}
              onChange={handleFilter}
            />
            {filteredData.length === 0 ? (
              <div onClick={handleEmptyClick} className="searchIcon">
                {" "}
                <SearchIcon fontSize="large" />{" "}
              </div>
            ) : (
              <div id="clearBtn" onClick={clearInput}>
                {" "}
                <Arrow></Arrow>
              </div>
            )}
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
                <span>
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
                  Login/Register
                </span>
              </Link>
            )}
          </div>
          {user && (
            <span onClick={logoutHandler} className="logout-span">
              <LogoutIcon />
              Logout
            </span>
          )}

          <Link to="/create">
            {/* {" "} */}
            {/* <div className="sellMenu"> */}
            {/* <SellButton></SellButton> */}
            {/* <div className="sellMenuContent"> */}
            {/* <SellButtonPlus></SellButtonPlus> */}
            <button class="headerBtn hover-btn">
              <span>UPLOAD</span>
            </button>
            {/* </div> */}
            {/* </div> */}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
