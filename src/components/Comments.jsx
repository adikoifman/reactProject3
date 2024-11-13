import React from "react";
import { useState, useEffect } from "react";
import SingleComment from "./SingleComment";

export default function Comments(props) {
  const [commentsList, setCommentsList] = useState([]);

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
        // const rightList = await data.filter(
        //   (item) => item.userId === Number(user.id)
        // );
        // setPostsList(rightList);
        // console.log("rightList: ", rightList);
        setCommentsList(data);
      } catch (err) {
        console.log("err: ", err);
      }
    };
    (async () => await fetchComments())();
  }, []);

  return (
    <div>
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
    </div>
  );
}
