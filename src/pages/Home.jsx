import React from "react";
import HomeNavbar from "../components/HomeNavbar";
import { Outlet } from "react-router-dom";

export default function Home() {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <>
      <h1>welcome {user.name} !</h1>
      <HomeNavbar />
      <Outlet />
    </>
  );
}
