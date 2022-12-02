import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FindDuo from "./Landing/FindDuo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element="" />
        <Route path="/login" element="" />
        <Route path="/" element="" />
        <Route
          path="/findDuo"
          element={<FindDuo username="VividEradicator"></FindDuo>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
