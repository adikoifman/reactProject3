import React from "react";

export default function SingleComment(props) {
  return (
    <div>
      <strong>{props.comment.email}:</strong>
      {props.comment.body}
    </div>
  );
}
