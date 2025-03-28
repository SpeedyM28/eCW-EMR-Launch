import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import LaunchPage from './LaunchPage.jsx';
import Callback from './Callback.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Launch URL */}
        <Route path="/launch" element={<LaunchPage />} />
        
        {/* Route for the Callback URL */}
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  );
}

export default App;