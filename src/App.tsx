import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormType } from './components/Start/Form';
import Start from './components/Start/Start';
import { FilterProvider } from './contexts/FilterContext';
import { LoggedUserProvider } from './contexts/LoggedUserContext';
import { MatchedUserProvider } from './contexts/MatchedUserContext';

function App() {

  return <BrowserRouter>
          <LoggedUserProvider>
          <FilterProvider>
          <MatchedUserProvider>
            <Routes>
              <Route path="/" element={<Start formType={FormType.Registration}></Start>} />
              <Route path="/register" element={<Start formType={FormType.Registration}></Start>} />
              <Route path="/login" element={<Start formType={FormType.Login}></Start>} />
            </Routes>
          </MatchedUserProvider>
          </FilterProvider>
          </LoggedUserProvider> 
        </BrowserRouter>;
}

export default App;