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
      </div>
    </>
  );
}
