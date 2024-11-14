import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UsersArrContext } from "../context/useUserArrayContext";
import apiRequests from "../components/apiRequests";
export default function Info() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const { usersArr, setUsersArr } = useContext(UsersArrContext);
  console.log(usersArr);

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

  async function infoSubmitHandler(e) {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const newUserData = {
      title: name,
      name: name,
      email: email,
      adress: adress,
      city: city,
      phone: phone,
    };
    const res = await apiRequests(`http://localhost:3500/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(newUserData),
    });
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ ...user, ...newUserData })
    );

    console.log("newUserData: ", newUserData);
    console.log(usersArr);
    navigate(`/home/${user.id}`);
  }

  return (
    <>
      <div id="info">
        <h1>More info about you</h1>
        <label>name:</label>
        <input onChange={(e) => setname(e.target.value)} />
        <label>email:</label>
        <input onChange={(e) => setEmail(e.target.value)} />
        <label>adress:</label>
        <input onChange={(e) => setAdress(e.target.value)} />
        <label>city:</label>
        <input onChange={(e) => setCity(e.target.value)} />
        <label>phone:</label>
        <input onChange={(e) => setPhone(e.target.value)} />
        <button onClick={() => infoSubmitHandler()}>submit</button>

        <p>dont want blaaaa?</p>
        <NavLink to="/home">home</NavLink>
      </div>
    </>
  );
}
