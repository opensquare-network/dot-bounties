import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Header from "./pages/Header";
import styled from 'styled-components'
import Home from "./pages/Home";

const Content = styled.div`
  display: flex;
  flex: 1;
  overflow-y: auto;
  
  padding-top: 16px;
  margin: 0 auto;
  min-width: 1280px;
  max-width: 1440px;
`;

function App() {
  return (
    <Router>
      <Header />
      <Content>
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </Content>
    </Router>
  );
}

export default App;
