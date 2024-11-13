import React from "react";
import { useState } from "react";
import Photos from "./Photos";

export default function Singlealbum(props) {
  const [displayPhotos, setDisplayPhotos] = useState(false);
  return (
    <>
      <div>
        <button
          className="album"
          onClick={() => setDisplayPhotos((prev) => !prev)}
        >
          id: {props.album.id} <br />
          title:{props.album.title}
        </button>
        {displayPhotos && <Photos albumId={props.album.id} />}
      </div>
    </>
  );
}
