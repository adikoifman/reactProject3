import React, { useState } from "react";
import { useEffect } from "react";
import Post from "./Post";
import apiRequests from "../components/apiRequests";
export default function ToDo() {
    const [todoList, setTdoList] = useState([]);
    const [newTodo, setnewTodo] = useState("");
    const [editTodoId, setEditTodoId] = useState(0);

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
        if (editTodoId) {
            const editToDo = todoList.find((item) => item.id === editTodoId);
            console.log(editToDo)
            //     const updatedToDo = todoList.map((i) =>
            //         i.id === editToDo.id
            //     ? (i = {id: i.id, newTodo})
            //     : ({id: i.id, todo: i.newTodo}) 
            // );
            const updatedToDo = todoList.map((i) => {
                if(editToDo.id === i.id){
                    return {...i, title: newTodo};
                }else{
                    return i;
                }
                
            }
            );

            console.log('updatedToDo: ', updatedToDo);
            setTdoList(updatedToDo);
            setEditTodoId(0);
            setnewTodo("")
            return;
        }
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

    const editMission = async (id) => {
        console.log("id: ", id);
        const editMissionById = todoList.find((item) => item.id === id)
        setnewTodo(editMissionById)
        console.log("editMissionById: ", editMissionById);
        setEditTodoId(editMissionById.id)
    };

    return (
        <>
            <label>add todo:</label>
            <input onChange={(e) => setnewTodo(e.target.value)} />
            <button onClick={() => addMision()}>{editTodoId ? `edit` : `+`}</button>
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
                        {/* <button onClick={() => editing()}>edit</button>; */}
                        <button onClick={() => deleteMission(item.id)}>
                            <img
                                width="40"
                                height="auto"
                                src="https://www.shutterstock.com/image-vector/trash-can-icon-symbol-delete-260nw-1454137346.jpg"
                            />
                        </button>
                        <button onClick={() => editMission(item.id)}>
                            <img
                                width="40"
                                height="auto"
                                src="https://logowik.com/content/uploads/images/888_edit.jpg"
                            />
                        </button>
                    </div>
                );
            })}
        </>
    );
}
