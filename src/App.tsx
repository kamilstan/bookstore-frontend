import React from 'react';


import './App.css';
import {LoginView} from "./pages/LoginView/LoginView";
import {Routes, Route} from "react-router-dom";
import {RegisterView} from "./pages/RegisterView/RegisterView";
import {AdminView} from "./pages/AdminView/AdminView";
import {CustomerView} from "./pages/CustomerView/CustomerView";
import {BookView} from "./pages/BookView/BookView";

function App() {

  return (
      <>
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
                  path="/book"
                  element={<BookView />}
              />
          </Routes>
      </>
  );
}

export default App;
