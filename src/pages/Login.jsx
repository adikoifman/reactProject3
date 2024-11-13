import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ApiContext } from "../context/urlContext";
import { UsersArrContext } from "../context/useUserArrayContext";

import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState([]);

  const { usersArr, setUsersArr } = useContext(UsersArrContext);

  console.log("hhhh");

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
    const rightuser = usersArr.filter(
      (item) => item.username === username && item.website === password
    );
    if (rightuser.length === 0) {
      alert("username or password not valid");
    } else {
      localStorage.setItem("currentUser", JSON.stringify(rightuser[0]));
      navigate(`/home/${rightuser[0].id}`);
    }
  };

  return (
    <div>
      <h1>log in:</h1>
      <label>user name:</label>
      <input onChange={(e) => setUsername(e.target.value)} />
      <label>password:</label>
      <input onChange={(e) => setPassword(e.target.value)} />

      <button onClick={loginHandler}>login</button>

      <p>dont have an acount?</p>
      <NavLink to="/signup">signup</NavLink>
    </div>
  );
}
