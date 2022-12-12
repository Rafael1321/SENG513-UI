import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormType } from './components/Start/Form';
import Start from './components/Start/Start';
import ChatHistory from './components/Chat/ChatHistory';
import { LoggedUserProvider } from './contexts/LoggesUserContext';
import ChatBody from './components/Chat/ChatBody';

function App() {

  return <BrowserRouter>
          <LoggedUserProvider>
            <Routes>
              <Route path="/" element={<Start formType={FormType.Registration}></Start>} />
              <Route path="/register" element={<Start formType={FormType.Registration}></Start>} />
              <Route path="/login" element={<Start formType={FormType.Login}></Start>} />
              <Route path="/history" element={<ChatHistory />} />
              <Route path="/chat" element={<ChatBody />} />
            </Routes>
          </LoggedUserProvider>    
        </BrowserRouter>;
}

export default App;