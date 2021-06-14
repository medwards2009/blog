import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Test from "./pages/Test";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route path={"/dummypage"} component={Test} />
      </Switch>
    </Router>
  );
}

export default App;
