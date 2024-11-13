import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import apiRequests from "../components/apiRequests";
import SinglePost from "./SinglePost";

export default function Albums() {

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const res = await fetch("http://localhost:3500/albums");
        if (!res.ok) {
          throw Error("ERORRR!");
        }
        const data = await res.json();
        console.log("data: ", data);

        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        // let user = JSON.parse(localStorage.getItem("currentUser"));

        const currentUserAlbum = data.filter(filterByID)
        console.log("currentUserAlbum: ", currentUserAlbum);

        localStorage.setItem("currentAlbum", JSON.stringify(currentUserAlbum));
      
        function filterByID(item) {
          console.log("item", item)
          console.log("currentUser", currentUser)

          if (item.userId === JSON.parse(currentUser.id)) {
            console.log("tywrgkwmrkwrm")
          }
          
        }
      } catch (err) {
        console.log("err: ", err);
      }
    };
    
    (async () => await fetchAlbum())();
  }, []);


  return <div>Albums</div>;
}

///show pic album by user id (txt)
// array pic user 1

