import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { PostContext } from "../../contextStore/PostContext";
import "./postcards.css";

function PostCards({ product, index }) {
  let { setPostContent } = useContext(PostContext); //at the time of onClick on post ,the specified post item assigned to postContent by setPostContent function and it will be stored in a global context PostContext

  const navigate = useNavigate(); //at the time of onClick on post , we want redirect to the view post page

  return (
    <div
      className="card"
      key={index}
      onClick={() => {
        setPostContent(product);
        navigate("/view");
      }}
    >
      <div className="image">
        <img src={product.url} alt="" />
      </div>
      <div className="cardContent">
        <div className="content">
          <p className="rate">&#x20B9; {product.price}</p>
          <p className="name"> {product.name}</p>
          <p className="category"> {product.category} </p>
          <p className="location">{product.location}</p>
        </div>
        <div className="date">
          <span>{product.createdAt}</span>
        </div>
      </div>
    </div>
  );
}

export default PostCards;
