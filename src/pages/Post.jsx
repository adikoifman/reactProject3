import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import apiRequests from "../components/apiRequests";
import SinglePost from "./SinglePost";
export default function Post() {
  const [postsList, setPostsList] = useState([]);

  let user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:3500/posts/");
        if (!res.ok) {
          throw Error("ERORRR!");
        }
        const data = await res.json();
        console.log("data: ", data);
        const rightList = await data.filter(
          (item) => item.userId === Number(user.id)
        );
        setPostsList(rightList);
        console.log("rightList: ", rightList);
      } catch (err) {
        console.log("err: ", err);
      }
    };
    (async () => await fetchPosts())();
  }, []);
  console.log("postsList: ", postsList);
  return (
    <>
      <div>Posts!</div>

      {postsList.map((item) => {
        return <SinglePost post={item} />;
      })}
    </>
  );
}
