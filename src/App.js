import "./App.css";
import "antd/dist/antd.css";
import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalContext } from "./GlobalProvider";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Verify from "./pages/Verify";
import Error from "./pages/Error";
import { useEffect } from "react";

function App() {
  const { dispatch } = useContext(GlobalContext);

  useEffect(() => {
    setToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setToken = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      dispatch({
        type: "SET_CONFIG",
        payload: { token },
      });
    }
  };

  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route path={"/verify"} component={Verify} />
        <Route path={"/error"} component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
