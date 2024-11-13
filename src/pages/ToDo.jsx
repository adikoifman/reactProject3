import React, { useState } from "react";
import { useEffect } from "react";
import Post from "./Post";
import apiRequests from "../components/apiRequests";
export default function ToDo() {
  const [todoList, setTdoList] = useState([]);
  const [newTodo, setnewTodo] = useState("");

  let user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:3500/todos/");
        if (!res.ok) {
          throw Error("ERORRR!");
        }
        const data = await res.json();
        console.log("data: ", data);
        const rightList = await data.filter(
          (item) => item.userId === Number(user.id)
        );
        setTdoList(rightList);
        console.log("rightList: ", rightList);
      } catch (err) {
        console.log("err: ", err);
      }
    };
    (async () => await fetchTodos())();
  }, []);

  const addMision = async () => {
    console.log("hi");
    const newMission = {
      title: newTodo,
      userId: Number(user.id),
      id: JSON.stringify(Math.floor(Math.random() * 1000000) + 5),
      completed: false,
    };
    const res = await apiRequests("http://localhost:3500/todos/", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(newMission),
    });
    setTdoList((prev) => [...prev, newMission]);
    console.log("newMission: ", newMission);
  };

  const deleteMission = async (id) => {
    console.log("id: ", id);
    const res = await apiRequests(`http://localhost:3500/todos/${id}`, {
      method: "DELETE",
    });
    console.log("res: ", res);
    const updatedList = todoList.filter((item) => item.id !== id);
    setTdoList(updatedList);
  };

  const checkedMission = async (mission) => {
    console.log("mission: ", mission);
    const res = await apiRequests(`http://localhost:3500/todos/${mission.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({
        completed: mission.completed === true ? false : true,
      }),
    });
    const updatedList = todoList.map((item) => {
      if (item.id === mission.id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setTdoList(updatedList);
  };

  return (
    <>
      <label>add todo:</label>
      <input onChange={(e) => setnewTodo(e.target.value)} />
      <button onClick={() => addMision()}>+</button>
      {todoList.map((item) => {
        return (
          <div key={item.id} className="mission">
            {" "}
            <button
              onClick={() => checkedMission(item)}
              style={{ background: item.completed ? "green" : "white" }}
            >
              checked
            </button>
            <li key={item.id}>{item.title}</li>
            <button onClick={() => deleteMission(item.id)}>
              <img
                width="40"
                height="auto"
                src="https://www.shutterstock.com/image-vector/trash-can-icon-symbol-delete-260nw-1454137346.jpg"
              />
            </button>
            ;
          </div>
        );
      })}
    </>
  );
}
