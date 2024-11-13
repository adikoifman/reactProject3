import React from "react";
import apiRequests from "./apiRequests";
export default function SingleComment(props) {
  const deleteComment = async (id) => {
    const res = await apiRequests(`http://localhost:3500/comments/${id}`, {
      method: "DELETE",
    });
    console.log("res: ", res);
    const updatedList = props.commentsList.filter((item) => item.id !== id);
    props.setCommentsList(updatedList);
  };
  return (
    <>
      <div className="comments">
        <strong>{props.comment.name}:</strong>
        {props.comment.body}
      </div>
      <div className="deleteComment">
        <button onClick={() => deleteComment(props.comment.id)}>
          <img
            width="20"
            height="auto"
            src="https://www.shutterstock.com/image-vector/trash-can-icon-symbol-delete-260nw-1454137346.jpg"
          />
        </button>
      </div>
    </>
  );
}
