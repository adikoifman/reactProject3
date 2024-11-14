import React from "react";
import HomeNavbar from "../components/HomeNavbar";
import { Outlet } from "react-router-dom";

export default function Home() {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  console.log('user.name: ', user);

  return (
    <>
      <h1>welcome {user.username || ""} !</h1>
      <HomeNavbar />
      <Outlet />
    </>
  );
}
