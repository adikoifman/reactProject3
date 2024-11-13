import React from "react";

export default function Singlealbum(props) {
  return (
    <>
      <div className="album">
        id: {props.album.id} <br />
        title:{props.album.title}
      </div>
    </>
  );
}
