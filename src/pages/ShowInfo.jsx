import React from "react";

export default function ShowInfo() {
  let user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <>
      <h2>Your details:</h2>
      <li>email:{user?.email}</li>
      <li>name:{user?.name}</li>
      <li>phone:{user?.phone}</li>
    </>
  );
}
