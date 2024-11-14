import React, { useState, useEffect } from "react";

export default function Photos(props) {
  const [startIndex, setStartIndex] = useState(0);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    (async () => await fetchPhotos())();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await fetch(
        `http://localhost:3500/photos?_start=${startIndex}&_limit=2&albumId=${props.albumId}`
      );
      if (!res.ok) {
        throw Error("ERORRR!");
      }
      const data = await res.json();
      console.log("data: ", data);
      if (photos.length === 0) {
        setPhotos(data);
      } else {
        setPhotos((prev) => [...prev, ...data]);
      }
      setStartIndex((prev) => prev + 5);
    } catch (err) {
      console.log("err: ", err);
    }
  };
  return (
    <>
      {photos.map((item) => {
        return (
          <div key={item.id}>
            id: {item.id}
            <img src={item.thumbnailUrl} />
          </div>
        );
      })}
      <button onClick={fetchPhotos}>show more</button>
      <br />
    </>
  );
}
