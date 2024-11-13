import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function HomeNavbar() {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("currentUser"));
  const logOut = () => {
    localStorage.setItem("currentUser", JSON.stringify(null));
    navigate("/");
  };
  return (
    <>
      <div id="navbar">
        <NavLink
          to="albums"
          style={({ isActive }) => {
            return { backgroundColor: isActive ? "pink" : "white" };
          }}
        >
          albums
        </NavLink>

        <NavLink
          to="todos"
          style={({ isActive }) => {
            return { backgroundColor: isActive ? "pink" : "white" };
          }}
        >
          todos
        </NavLink>
        <NavLink
          to="posts"
          style={({ isActive }) => {
            return { backgroundColor: isActive ? "pink" : "white" };
          }}
        >
          posts
        </NavLink>
        <NavLink
          to="showInfo"
          style={({ isActive }) => {
            return { backgroundColor: isActive ? "pink" : "white" };
          }}
        >
          your details
        </NavLink>
        <button
          onClick={() => {
            logOut();
          }}
        >
          log out
        </button>
      </div>
    </>
  );
}
