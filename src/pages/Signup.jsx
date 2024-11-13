import React, { useEffect, useState, createContext } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UsersArrContext } from "../context/useUserArrayContext";
import apiRequests from "../components/apiRequests";
export default function Signup() {
  const [username, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();

  const { usersArr, setUsersArr } = useContext(UsersArrContext);

  const signHandler = async () => {
    const newUser = {
      name: username,
      username: username,
      website: userPassword,
      id: JSON.stringify(Math.random() * 1000000),
    };
    const res = await apiRequests("http://localhost:3500/users", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(newUser),
    });
    console.log(setUsersArr);
    setUsersArr((prev) => [...prev, newUser]);
    console.log("newUser: ", newUser);

    localStorage.setItem("currentUser", JSON.stringify(newUser));
    navigate("/info");
  };

  return (
    <>
      <div>
        <h1>Sign up:</h1>
        <label>user name:</label>
        <input onChange={(e) => setUserName(e.target.value)} />
        <label>password:</label>
        <input onChange={(e) => setUserPassword(e.target.value)} />

        <button onClick={signHandler}>signup</button>

        <p>have an acount?</p>
        <NavLink to="/">login</NavLink>
      </div>
    </>
  );
}
