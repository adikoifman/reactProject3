import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ApiContext } from "../context/urlContext";

export default function Login() {
  const [username, setUsername] = useState();
  const url = useContext(ApiContext);
  const fetchUsers = async () => {
    try {
      const res = await fetch(`http://localhost:3500/users`);
      if (!res.ok) {
        throw Error("ERORRR!");
      }
      const data = await res.json();
      console.log("data: ", data);
    } catch (err) {
      console.log("err: ", err);
    }
  };
  const loginHandler = () => {
    fetchUsers();
  };
  return (
    <div>
      <h1>log in:</h1>
      <label>user name:</label>
      <input onChange={(e) => setUsername(e.target.value)} />
      <label>password:</label>
      <input onChange={(e) => setUsername(e.target.value)} />
      <button onClick={loginHandler}>login</button>
      <p>dont have an acount?</p>
      <NavLink to="/signup">signup</NavLink>
    </div>
  );
}
