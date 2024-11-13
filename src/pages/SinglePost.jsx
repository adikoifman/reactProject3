import React from "react";
import { useState } from "react";

export default function SinglePost(props) {
  console.log("props: ", props);
  const [picked, setPicked] = useState(false);
  const showContent = () => {
    setPicked((prev) => !prev);
  };
  return (
    <div key={props.post.id} className={picked ? "postPicked" : "post"}>
      <strong>id:</strong>
      {props.post.id} <br /> <strong>title:</strong>
      {props.post.title} <br />
      {picked && (
        <div>
          <p>{props.post.body}</p>
        </div>
      )}
      <button onClick={() => showContent()}>
        {picked ? "hide info" : "more info"}
      </button>
    </div>
  );
}
