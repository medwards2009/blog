import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Verify from './pages/Verify';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route path={"/verify"} component={Verify} />
      </Switch>
    </Router>
  );
}

export default App;
