import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormType } from './components/Start/Form';
import Start from './components/Start/Start';
import { LoggedUserProvider } from './contexts/LoggedUserContext';

function App() {

  return <BrowserRouter>
          <LoggedUserProvider>
            <Routes>
              <Route path="/" element={<Start formType={FormType.Registration}></Start>} />
              <Route path="/register" element={<Start formType={FormType.Registration}></Start>} />
              <Route path="/login" element={<Start formType={FormType.Login}></Start>} />
            </Routes>
          </LoggedUserProvider>    
        </BrowserRouter>;
}

export default App;