import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import "./Post.css";
import { Firebase } from "../../firebase/config";
import BarLoading from "../Loading/BarLoading";
import PostCards from "../PostCards/PostCards";

import { AllPostContext } from "../../contextStore/AllPostContext";

function Posts() {
  const { setAllPost } = useContext(AllPostContext);
  let [posts, setPosts] = useState([]); //for showing all posts in Descending order of date
  let [posts2, setPosts2] = useState([]); //for showing all posts in Ascending order of date
  let [loading, setLoading] = useState(false);
  let [loading2, setLoading2] = useState(false);
  useEffect(() => {
    setLoading(true);
    setLoading2(true);
    Firebase.firestore() //retreving all posts from firebase in descending order
      .collection("products")
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        let allPostsDescendingOder = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });

        setPosts2(allPostsDescendingOder); //set to post
        setAllPost(allPostsDescendingOder);
        setLoading(false);
      });
    Firebase.firestore() //retreving all posts from firebase in asecnding order of date
      .collection("products")
      .orderBy("createdAt", "asc")
      .get()
      .then((snapshot) => {
        let allPostsAscendingOder = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        if (allPostsAscendingOder.length === 0) {
          document.getElementById("cards").innerHTML =
            '<div style="color:white; display: flex; justify-content: center; align-items:center;"><span>Network failed. Check your connection !</span></div>';
          document.getElementById("recommendations").innerHTML =
            '<div style="color:white; width:100vw;display: flex; justify-content: center; align-items:center;"><span>Network failed. Check your connection !</span></div>';
        } else {
          setPosts(allPostsAscendingOder);
          setLoading2(false);
        }
        console.log(allPostsAscendingOder);
      });
  }, [setAllPost]);
  // quickMenuCards assign all cards of post item later it will be displayed
  let quickMenuCards = posts.map((product, index) => {
    return (
      <div className="quick-menu-cards" key={index}>
        {" "}
        <PostCards product={product} index={index} />{" "}
      </div>
    );
  });

  let freshRecomendationCards = posts2.map((product, index) => {
    if (index < 4) {
      return (
        <div className="fresh-recomendation-card" key={index}>
          {" "}
          <PostCards product={product} index={index} />{" "}
        </div>
      );
    }
    return null;
  });
  return (
    <div className="postParentDiv">
      {posts && (
        <div className="moreView">
          <div className="heading">
            <span className="quickMenu">QUICK MENU</span>
            <Link to="./viewmore">
              {" "}
              <span>View more</span>{" "}
            </Link>
          </div>
          <div className="cards" id="cards">
            {" "}
            {loading ? <BarLoading /> : quickMenuCards}
          </div>
        </div>
      )}
      <div className="recommendations">
        <div className="heading" id="recHeading">
          <div className="hrBar"></div>
          <span>Top-Picks</span>
          <div className="hrBar"></div>
        </div>
        <div className="fresh-recomendation-cards" id="recommendations">
          {loading2 ? <BarLoading /> : freshRecomendationCards}
        </div>
      </div>
    </div>
  );
}

export default Posts;
