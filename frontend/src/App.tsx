import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Chat } from "./components/chat/Chat";
import { Friendslist } from "./components/Friendslist";
import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";
import { Login } from "./components/userAuth/Login";
import { Register } from "./components/userAuth/Register";

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await fetch("/auth/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      // parse response from server
      const parseResponse = await response.json();

      parseResponse === true
        ? setIsAuthenticated(true)
        : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const setAuth = (isUserAuth: boolean): void => {
    setIsAuthenticated(isUserAuth);
  };

  // Function to log out an user pass to navbar to display the button
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("chat-history");
    setAuth(false);
    toast.success("Logged Out Successfully");
  };

  return (
    <div>
      <Router>
        <NavBar isAuth={isAuthenticated} logout={logout} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/chat"
            render={(Props) =>
              isAuthenticated ? (
                <Chat {...Props} authSetter={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/friends"
            render={(Props) =>
              isAuthenticated ? (
                <Friendslist {...Props} authSetter={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/login"
            render={(Props) =>
              !isAuthenticated ? (
                <Login {...Props} authSetter={setAuth} />
              ) : (
                <Redirect to="/chat" />
              )
            }
          />
          <Route
            path="/register"
            render={(Props) =>
              !isAuthenticated ? (
                <Register {...Props} authSetter={setAuth} />
              ) : (
                <Redirect to="/chat" />
              )
            }
          />
          <Route path="*"> Error page</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
