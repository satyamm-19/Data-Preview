import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppContent from "./components/AppContent";
import SuccessPage from "./components/SuccessPage";
import "./App.css";
import Preview from "./components/Preview";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;