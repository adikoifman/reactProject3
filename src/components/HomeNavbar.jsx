import React from "react";
import { NavLink } from "react-router-dom";
// import { Outlet } from "react-router-dom";
export default function HomeNavbar() {
  return (
    <>
      <div id="navbar">
        <NavLink
          to="albums"
          style={({ isActive }) => {
            return { color: isActive ? "pink" : "grey" };
          }}
        >
          albums
        </NavLink>
        <span> </span>
        <NavLink
          to="todos"
          style={({ isActive }) => {
            return { color: isActive ? "pink" : "grey" };
          }}
        >
          todos
        </NavLink>
        <NavLink
          to="posts"
          style={({ isActive }) => {
            return { color: isActive ? "pink" : "grey" };
          }}
        >
          posts
        </NavLink>
      </div>
    </>
  );
}
