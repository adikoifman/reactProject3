import React from "react";
import { useState } from "react";

export default function SinglePost(props) {
  console.log("props: ", props);
  const [picked, setPicked] = useState(false);
  const showContent = () => {
    setPicked((prev) => !prev);
  };
  return (
    <div key={props.post.id} className="post">
      <li>
        <strong>id:</strong>
        {props.post.id} <br /> <strong>title:</strong>
        {props.post.title} <br />
        {picked && `<strong>content:</strong>${props.post.body}`}
      </li>
      <button onClick={() => showContent()}>content:</button>
    </div>
  );
}
