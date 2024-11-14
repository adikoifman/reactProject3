import React from "react";
import HomeNavbar from "../components/HomeNavbar";
import { Link, Outlet } from "react-router-dom";

export default function Home() {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  console.log("user.name: ", user);

  return (
    <>
      {!user ? (
        <h1>
          you need to sign in first!
          <Link to="/">login</Link>
        </h1>
      ) : (
        <>
          {" "}
          <h1>welcome {user.username || ""} !</h1>
          <HomeNavbar />
          <Outlet />
        </>
      )}
    </>
  );
}
