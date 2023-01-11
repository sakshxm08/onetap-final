import React, { useState } from "react";
// import Dropdown from "../Dropdown/Dropdown";
import DynamicPosts from "../DynamicPosts/DynamicPosts";

import "./Banner.css";

function Banner() {
  let [category, setCategory] = useState();

  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="otherQuickOptions">
            <div className="dropdown">
              <select
                name="Category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="categDropdown"
              >
                <option value="null">Select Category</option>
                <option value="Auditoriums">Auditoriums</option>
                <option value="Gyms">Gyms</option>
                <option value="Swimming Pools">Swimming Pools</option>
                <option value="Cafes">Cafes</option>
                <option value="Open Grounds">Open Grounds</option>
                <option value="Lounges">Lounges</option>
              </select>
            </div>
            <div className="optionBar">
              <span
                className="bannerCategory"
                onClick={() => setCategory("Auditoriums")}
              >
                AUDITORIUMS
              </span>
              <span
                className="bannerCategory"
                onClick={() => setCategory("Gyms")}
              >
                GYMS
              </span>
              <span
                className="bannerCategory"
                onClick={() => setCategory("Swimming Pools")}
              >
                SWIMMING POOLS
              </span>
              <span
                className="bannerCategory"
                onClick={() => setCategory("Cafes")}
              >
                CAFES
              </span>
              <span
                className="bannerCategory"
                onClick={() => setCategory("Open Grounds")}
              >
                OPEN GROUNDS
              </span>
              <span
                className="bannerCategory"
                onClick={() => setCategory("Lounges")}
              >
                LOUNGES
              </span>
            </div>
          </div>
        </div>
        <div className="banner">
          <img src="../../../Images/banner copy.png" alt="" />
        </div>
      </div>
      {category != null && <DynamicPosts category={category} />}
    </div>
  );
}

export default Banner;
