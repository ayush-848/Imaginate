import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import webfont from 'webfontloader';
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AuthProvider from "./context/authContext";
import { ToastContainer } from "react-toastify";



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
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
        </AuthProvider>
    </Router>
  );
};

export default App;
