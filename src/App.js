import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Test from './pages/Test';
import Nav from './components/Nav';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path={'/'} component={Home} />
        <Route path={'/dummypage'} component={Test} />
      </Switch>
    </Router>
  );
}

export default App;
