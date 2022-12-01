import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormType } from './components/Start/Form';
import Start from './components/Start/Start';

function App() {
  return <BrowserRouter>
            <Routes>
              <Route path="/" element={<Start formType={FormType.Registration}></Start>} />
              <Route path="/register" element={<Start formType={FormType.Registration}></Start>} />
              <Route path="/login" element={<Start formType={FormType.Login}></Start>} />
            </Routes>
          </BrowserRouter>;
}

export default App;