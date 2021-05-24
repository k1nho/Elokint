import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from './components/Chat';
import Friendslist from './components/Friendslist';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Login from './components/userAuth/Login';
import Register from './components/userAuth/Register';

function App() {
  return (
    <div>
      <Router>
      <NavBar/>
        <Switch>
          <Route exact path = "/" component= {Home}/>
         <Route path = "/chat" component= {Chat}/>
         <Route path = "/friends" component= {Friendslist}/>
         <Route path = "/login" component= {Login}/>
         <Route path = "/register" component = {Register}/>
         <Route path = "*"> Error page</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
