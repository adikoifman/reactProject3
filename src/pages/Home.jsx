import React from "react";
import HomeNavbar from "../components/HomeNavbar";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>welcome </h1>
      <HomeNavbar />
      <Outlet />
    </>
  );
}
