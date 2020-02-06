import React from 'react';
import { Route } from "react-router-dom";
import './App.css';

import Header from "./components/header/Header"
import LoginPage from "../src/pages/login/LoginPage";

function App() {
  return (
    <div className="App">
      <Header />
        <div>
          <Route exact path="/" component={LoginPage} />
        </div>
    </div>
  );
}

export default App;
