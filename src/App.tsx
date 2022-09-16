import React, {useState} from 'react';


import './App.css';
import {LoginView} from "./pages/LoginView/LoginView";
import {Routes, Route} from "react-router-dom";
import {RegisterView} from "./pages/RegisterView/RegisterView";
import {AdminForCustomersView} from "./pages/AdminForCustomersView/AdminForCustomersView";
import {AdminForBooksView} from "./pages/AdminForBooksView/AdminForBooksView";
import {CustomerView} from "./pages/CustomerView/CustomerView";
import {BookView} from "./pages/BookView/BookView";
import { SearchContext } from './contexts/search.context';
import {CustomerProfileView} from "./pages/CustomerProfileView/CustomerProfileView";

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
                  path="/admin/books"
                  element={<AdminForBooksView />}
              />
              <Route
                  path="/admin/customers"
                  element={<AdminForCustomersView />}
              />
              <Route
                  path="/customer"
                  element={<CustomerView />}
              />
              <Route
                  path="/customer/profile"
                  element={<CustomerProfileView />}
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
