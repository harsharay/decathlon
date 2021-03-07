import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"

import './App.css';
import Cart from "./Components/Cart/Cart";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import NavBar from "./Components/NavBar/NavBar"
import Checkout from "./Components/Checkout/Checkout"
import MyAccount from "./Components/MyAccount/MyAccount";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="App">
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/cart" component={Cart} exact/>
          <Route path="/login" component={Login} exact/>
          <Route path="/checkout" component={Checkout} exact/>
          <Route path="/myAccount" component={MyAccount} exact/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
