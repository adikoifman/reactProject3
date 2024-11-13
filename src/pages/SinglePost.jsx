import React from "react";
import { useState } from "react";
import Comments from "../components/Comments";
import apiRequests from "../components/apiRequests";
export default function SinglePost(props) {
  const [picked, setPicked] = useState(false);
  const [comments, setComments] = useState(false);
  const showContent = () => {
    setPicked((prev) => !prev);
  };
  const displayComments = () => {
    setComments((prev) => !prev);
  };
  const deletePost = async (id) => {
    const res = await apiRequests(`http://localhost:3500/posts/${id}`, {
      method: "DELETE",
    });
    console.log("res: ", res);
    const updatedList = props.postsList.filter((item) => item.id !== id);
    props.setPostsList(updatedList);
  };
  return (
    <div key={props.post.id} className={picked ? "postPicked" : "post"}>
      <strong>id:</strong>
      {props.post.id} <br /> <strong>title:</strong>
      {props.post.title} <br />
      {picked && (
        <div>
          <p>{props.post.body}</p>
          <button onClick={() => displayComments()}>
            <img
              width="40"
              height="auto"
              src="https://www.shutterstock.com/image-vector/chat-speech-bubble-icon-symbol-260nw-1451224709.jpg"
            />
          </button>
          {comments && <Comments postId={props.post.id} />}
        </div>
      )}
      <button onClick={() => showContent()}>
        {picked ? "hide info" : "more info"}
      </button>
      <button onClick={() => deletePost(props.post.id)}>
        <img
          width="40"
          height="auto"
          src="https://www.shutterstock.com/image-vector/trash-can-icon-symbol-delete-260nw-1454137346.jpg"
        />
      </button>
    </div>
  );
}
