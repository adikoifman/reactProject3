import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { ApiProvider } from "./context/urlContext";
import Albums from "./pages/Albums";
import ToDo from "./pages/ToDo";
import Post from "./pages/Post";
// import SinglePost from "./pages/SinglePost";
// import PostsLayout from "./components/PostsLayout";
function App() {
  return (
    <ApiProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />}>
            <Route path="albums" element={<Albums />} />

            <Route path="posts" element={<Post />} />

            <Route path="todos" element={<ToDo />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </ApiProvider>
  );
}

export default App;
