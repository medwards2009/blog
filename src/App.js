import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/Home';
import Test from './pages/Test';
import Nav from './components/Nav';

const Wrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  font-weight: heavy;
`;

function App() {
  return (
    <Wrapper>
      <Router>
        <Switch>
          <Route path={'/'} component={Nav} />
          <Route path={'/'} component={Home} />
          <Route path={'/dummypage'} component={Test} />
        </Switch>
      </Router>
    </Wrapper>
  );
}

export default App;
