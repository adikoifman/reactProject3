import React, { useState, useEffect } from "react";
import Singlealbum from "../components/Singlealbum";

export default function Albums() {
  const [albumsList, setAlbumsList] = useState([]);
  let user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await fetch(
          `http://localhost:3500/albums?userId=${user.id}`
        );
        if (!res.ok) {
          throw Error("ERORRR!");
        }
        const data = await res.json();
        console.log("data: ", data);

        setAlbumsList(data);
      } catch (err) {
        console.log("err: ", err);
      }
    };
    (async () => await fetchAlbums())();
  }, []);
  return (
    <>
      {albumsList.map((item) => {
        return <Singlealbum album={item} key={item.id} />;
      })}
    </>
  );
}

///show pic album by user id (txt)
// array pic user 1

