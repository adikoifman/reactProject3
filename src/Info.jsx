import React from 'react';
import { NavLink } from "react-router-dom";
import { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UsersArrContext} from "../src/context/useUserArrayContext"


export default function Info() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const {usersArr, setUsersArr} = useContext(UsersArrContext);
  console.log(usersArr)

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
  
//   useEffect(() => {
//   console.log("usersArr: ", usersArr)
// }, [usersArr]);
let user = JSON.parse(localStorage.getItem("currentUser"));

  function infoSubmitHandler (e) {
    console.log(e)

    //put req?? post??
    const addDataToUser = async () => {
      const newUserData = {
        title: name,
        userName: user.username,
        name: name,
        email: email,
        adress: adress,
        city: city,
        phone: phone,
        // id: JSON.stringify(Math.floor(Math.random() * 1000000) + 5),
        completed: false,
      };
      const res = await fetch("http://localhost:3500/users", {
        method: "PATCH",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(newUserData),
      });
      const updatedUserData = usersArr.map((item) => {
        if (item) {
          item.completed = !item.completed
        }
        return item
      });
      setUsersArr(updatedUserData);
      console.log("newUserData: ", newUserData);
      console.log(usersArr)
      localStorage.setItem("currentUser", JSON.stringify(newUserData))

    };
    addDataToUser()
  
    navigate(`/home/${user.id}`);

  
  }

  return (
    <>
      <h1>More info about you</h1>
      <div>
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
        <button onClick={infoSubmitHandler}>submit</button>


        <p>dont want blaaaa?</p>
        <NavLink to={`/home/${user.id}`}>home</NavLink>
      </div>
    </>
  )
}

// "name": "Leanne Graham",
//       "username": "Bret",
//       "email": "Sincere@april.biz",
//       "address": {
//         "street": "Kulas Light",
//         "suite": "Apt. 556",
//         "city": "Gwenborough",
//         "zipcode": "92998-3874",
//         "geo": {
//           "lat": "-37.3159",
//           "lng": "81.1496"
//         }
//       },
//       "phone": "1-770-736-8031 x56442",
//       "website": "hildegard.org",
//       "company": {
//         "name": "Romaguera-Crona",
//         "catchPhrase": "Multi-layered client-server neural-net",
//         "bs": "harness real-time e-markets"
//       }

// import axios from 'axios';


// function PostAPI() {
//   const postData = {
//     type: "posts",
//     attributes: { title: "Third Post", content: "Trying Out!" }
//   }

//   const handlePost = async () => {
//     try {
//       const response = await axios.post(
//         'http://localhost:4000/data',
//         postData
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handlePost}>Create Post</button>
//   );
// }
// export default PostAPI;


// const getData = async () => {
//   try {
//     const res = await fetch("url", {
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
// }



// //     </div>