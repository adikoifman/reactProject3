import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { ApiProvider } from "./context/urlContext";
import { UsersArrProvider } from "./context/useUserArrayContext";
import Albums from "./pages/Albums";
import ToDo from "./pages/ToDo";
import Post from "./pages/Post";
import Info from "./Info"
function App() {
  return (
    <ApiProvider>
      <UsersArrProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/info" element={<Info />} />
          <Route />
          <Route path="/home" element={<Home />}>
            <Route path="albums" element={<Albums />} />
            <Route path="posts" element={<Post />} />
            <Route path="todos" element={<ToDo />} />
          </Route>

              <Route path="*" element={<Error />} />
            </Routes>
          </Router>
      </UsersArrProvider>
    </ApiProvider>
  );
}

export default App;
