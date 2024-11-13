import React from "react";
import { useState, useEffect } from "react";
import SingleComment from "./SingleComment";
import apiRequests from "./apiRequests";

export default function Comments(props) {
  const [commentsList, setCommentsList] = useState([]);
  const [newName, setNewName] = useState("");
  const [newBody, setNewBody] = useState("");
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:3500/comments?postId=${props.postId}`
        );
        if (!res.ok) {
          throw Error("ERORRR!");
        }
        const data = await res.json();
        console.log("data: ", data);
        setCommentsList(data);
      } catch (err) {
        console.log("err: ", err);
      }
    };
    (async () => await fetchComments())();
  }, []);
  const addComment = async () => {
    console.log("hi");
    const newComment = {
      name: newName,
      postId: Number(props.postId),
      id: JSON.stringify(Math.random() * 1000000),
      body: newBody,
    };
    const res = await apiRequests("http://localhost:3500/comments/", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(newComment),
    });
    setCommentsList((prev) => [newComment, ...prev]);
  };

  return (
    <div>
      <header>
        <strong>
          <em>comments</em>
        </strong>
      </header>
      {commentsList.map((item) => {
        return (
          <SingleComment
            key={item.id}
            comment={item}
            commentsList={commentsList}
            setCommentsList={setCommentsList}
          />
        );
      })}
      <div id="addComments">
        <strong>add comment:</strong>
        <lable>name:</lable>
        <input onChange={(e) => setNewName(e.target.value)}></input>
        <lable>body:</lable>
        <input onChange={(e) => setNewBody(e.target.value)}></input>
        <button onClick={() => addComment()}>+</button>
      </div>
    </div>
  );
}
