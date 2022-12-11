import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing/Landing";
import MatchFound from "./Landing/MatchFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element="" />
        <Route path="/login" element="" />
        <Route path="/" element="" />
        <Route
          path="/landing"
          element={<Landing username="VividEradicator"></Landing>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
