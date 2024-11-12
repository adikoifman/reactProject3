import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ApiContext } from "../context/urlContext";
// import { useContext } from "react";
// import { ApiContext } from "../context/urlContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [usersArr, setUsersArr] = useState([]);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`http://localhost:3500/users`);
        if (!res.ok) {
          throw Error("ERORRR!");
        }
        const data = await res.json();
        console.log("data: ", data);
        setUsersArr(data);
      } catch (err) {
        console.log("err: ", err);
      }
    };
    (async () => await fetchUsers())();
  }, []);

  const loginHandler = () => {
    const rightuser = usersArr.filter((item) => item.name === username);
    if (rightuser.length === 0) {
      alert("username or password not valid");
    } else {
      localStorage.setItem("currentUser", JSON.stringify(rightuser[0].id));
      setLogin(true);
    }
  };

  return (
    <div>
      <h1>log in:</h1>
      <label>user name:</label>
      <input onChange={(e) => setUsername(e.target.value)} />
      <label>password:</label>
      <input onChange={(e) => setUsername(e.target.value)} />

      <button onClick={loginHandler}>login</button>
      <Link to={login ? "/Home" : "/login"}> go inside</Link>
      <p>dont have an acount?</p>
      <NavLink to="/signup">signup</NavLink>
    </div>
  );
}