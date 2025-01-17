import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import webfont from 'webfontloader';
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

const App = () => {
  useEffect(() => {
    webfont.load({
      custom: {
        families: ['montserrat', 'inter', 'raleway'],
      },
    });
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
