import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"

import './App.css';
import Cart from "./Components/Cart/Cart";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar"

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="App">
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/cart" component={Cart} exact/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
