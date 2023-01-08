import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import CreatePost from "../Pages/CreatePost";
import ViewPost from "../Pages/ViewPost";
import ViewMore from "../Pages/ViewMore";

function MainRoutes() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/create" element={<CreatePost />} />
        <Route exact path="/view" element={<ViewPost />} />
        <Route exact path="/viewmore" element={<ViewMore />} />
      </Routes>
    </Router>
  );
}

export default MainRoutes;
