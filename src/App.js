import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Login/Pages/Login";
import Signup from "./Signup/Pages/Signup";
import Home from "./Home/Pages/Home";
import Resource from "./Resource/Pages/Resource";
import Addresource from "./Addresource/Pages/Addresource";

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
          <Route path="/" exact component={Login}/>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/home" component={Home} />
            <Route path="/course" component={Home} />
            <Route path="/addresource" component={Addresource} />
            <Route path="/resource/:id" component={Resource} />
            <Redirect to="/"></Redirect>
          </Switch>
    </Router>
    </div>
  );
}

export default App;
