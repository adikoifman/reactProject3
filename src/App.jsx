import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { ApiProvider } from "./context/urlContext";
function App() {
  return (
    <ApiProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />}></Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </ApiProvider>
  );
}

export default App;
