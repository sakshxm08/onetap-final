import React, { useState, useContext } from "react";
import { AllPostContext } from "..//../contextStore/AllPostContext";
import { PostContext } from "../../contextStore/PostContext";
import SearchIcon from "@mui/icons-material/Search";

// import CloseIcon from "..//../assets/CloseIcon/CloseIcon";
import { useNavigate } from "react-router-dom";
import InputHints from "react-input-hints";
// import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

import "./search.css";
function Search() {
  const { allPost, setAllPost } = useContext(AllPostContext);
  const { setPostContent } = useContext(PostContext);
  const navigate = useNavigate();

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = allPost.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.category.toLowerCase().includes(searchWord.toLowerCase())
      );
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
  const handleSelectedSearch = (item) => {
    setPostContent(item);
    navigate("/view");
  };
  const handleSearchClick = () => {
    if (filteredData.length === 0) {
      alert(
        "No items found. Please search by product category or product name."
      );
    } else {
      setAllPost(filteredData);
      navigate("/viewmore");
    }
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <InputHints
          type="text"
          value={wordEntered}
          onChange={handleFilter}
          placeholders={[
            "Search Auditoriums",
            "Search Gyms",
            "Search Swimming Pools",
            "Search Cafes",
            "Search Open Grounds",
            "Search Lounges",
          ]}
        />

        {filteredData.length === 0 ? (
          <div className="searchIcon">
            <div onClick={handleSearchClick}>
              {" "}
              <SearchIcon fontSize="large" />{" "}
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
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <div
                key={key}
                className="dataItem"
                onClick={() => handleSelectedSearch(value)}
              >
                <p>{value.name} </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Search;
