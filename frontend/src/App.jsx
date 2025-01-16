import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import webfont from 'webfontloader';

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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
