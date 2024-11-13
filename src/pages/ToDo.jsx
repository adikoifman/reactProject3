import React, { useState } from "react";
import { useEffect } from "react";
import Post from "./Post";
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
      id: Math.random() * 10000,
    };
    const res = await fetch("http://localhost:3500/todos/", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(newMission),
    });
    setTdoList((prev) => [...prev, newMission]);
  };

  const deleteMission = async (id) => {
    const res = await fetch(`http://localhost:3500/todos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "Application/json" },
    });
    console.log("res: ", res);
    // await fetchTodos();
  };

  return (
    <>
      <label>add todo:</label>
      <input onChange={(e) => setnewTodo(e.target.value)} />
      <button onClick={() => addMision()}>+</button>
      {todoList.map((item) => {
        return (
          <div className="mission">
            {" "}
            <li key={item.id}>{item.title}</li>
            <button onClick={deleteMission(item.id)}>
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
