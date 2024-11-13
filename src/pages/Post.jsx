import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import apiRequests from "../components/apiRequests";
import SinglePost from "./SinglePost";

export default function Post() {
  const [postsList, setPostsList] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
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

  const addPost = async () => {
    console.log("hi");
    const newPost = {
      title: newTitle,
      userId: Number(user.id),
      id: JSON.stringify(Math.floor(Math.random() * 1000000) + 5),
      body: newBody,
    };
    const res = await apiRequests("http://localhost:3500/posts/", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(newPost),
    });
    setPostsList((prev) => [newPost, ...prev]);
  };

  return (
    <>
      <div id="posts">
        <div id="addPost">
          add new post:
          <lable>title:</lable>
          <input onChange={(e) => setNewTitle(e.target.value)}></input>
          <lable>body:</lable>
          <input onChange={(e) => setNewBody(e.target.value)}></input>
          <button onClick={() => addPost()}>+</button>
        </div>
        {postsList.map((item) => {
          return (
            <SinglePost
              key={item.id}
              post={item}
              postsList={postsList}
              setPostsList={setPostsList}
            />
          );
        })}
      </div>
    </>
  );
}
