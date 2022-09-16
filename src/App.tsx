import React, {useState} from 'react';


import './App.css';
import {LoginView} from "./pages/LoginView/LoginView";
import {Routes, Route} from "react-router-dom";
import {RegisterView} from "./pages/RegisterView/RegisterView";
import {AdminView} from "./pages/AdminView/AdminView";
import {CustomerView} from "./pages/CustomerView/CustomerView";
import {BookView} from "./pages/BookView/BookView";
import { SearchContext } from './contexts/search.context';

function App() {

    const [search, setSearch] = useState('');

  return (
      <>
          <SearchContext.Provider value={{search, setSearch}}>
          <Routes>
              <Route
                  path="/"
                  element={<LoginView />}
              />
              <Route
                  path="/login"
                  element={<LoginView />}
              />
              <Route
                  path="/register"
                  element={<RegisterView />}
              />
              <Route
                  path="/admin"
                  element={<AdminView />}
              />
              <Route
                  path="/customer"
                  element={<CustomerView />}
              />
              <Route
                  path="/book/:bookId"
                  element={<BookView />}
              />
          </Routes>
          </SearchContext.Provider>
      </>
  );
}

export default App;
