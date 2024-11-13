import React, { useEffect, useState, createContext} from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useNavigate,  } from "react-router-dom";
import { UsersArrContext} from "../context/useUserArrayContext"


export default function Signup() {
  const [username, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");


  // const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  // const UsersArrContext = createContext()
  // const UsersArry = useContext(UsersArrContext);
  // const SetUsersArry = useContext(SetUsersArrContext);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const res = await fetch(`http://localhost:3500/users`);
  //       if (!res.ok) {
  //         throw Error("ERORRR!");
  //       }
  //       const data = await res.json();
  //       console.log("data: ", data);
  //       setUsersArr(data);
  //     } catch (err) {
  //       console.log("err: ", err);
  //     }
  //   };
  //   (async () => await fetchUsers())();

  
  // }, []);
////////////////////////////////////////////////////
  const signHandler= () => {
    
    // const postUserData= async () => {
    //   try {
    //     const res = await fetch("http://localhost:3500/users?username=${username}", {
    //       method: 'POST',
    //       body: JSON.stringify({})
    //     })
    //     if (res.ok) {
    //       const jsonRes = await res.json();
    //       ////////
    //     }
    //   } catch (err) {
    //     console.log("err: ", err);
    //   }
    //   (async () => await postUserData())();
    // }


    const addUserToData = async () => {
      const newUser = {
        title: username,
        username: username,
        website: userPassword,
        id: JSON.stringify(Math.floor(Math.random() * 1000000) + 5),
        completed: false,
      };
      const res = await fetch("http://localhost:3500/users", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(newUser),
      });
      console.log(SetUsersArry)
      SetUsersArry((prev) => [...prev, newUser]);
      console.log("newUser: ", newUser);
    };
    addUserToData()
  
    navigate("/info");

  }
  

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
        <NavLink to="/login">login</NavLink>
      </div>
    </>

  )
}
