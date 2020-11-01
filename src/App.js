import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, } from 'react-router-dom'
import Header from "./pages/Header";
import styled from 'styled-components'
import Ksm from "./pages/Ksm";
import Dot from "./pages/Dot";
import Footer from "./pages/Footer";
import KsmDetail from "./pages/KsmDetail";
import DotDetail from "./pages/Dot/Detail";

const Content = styled.div`
  display: flex;
  flex: 1;
  overflow-y: auto;
  
  & > div {
    padding-top: 16px;
    margin: 0 auto;
    min-width: 1128px;
    max-width: 1440px;
  }
`;

function App() {
  return (
    <Router>
      <Header />
      <Content>
        <Switch>
          <Route exact path="/ksm" component={Ksm} />
          <Route exact path="/ksm/:index" component={KsmDetail} />
          <Route exact path="/dot" component={Dot} />
          <Route exact path="/dot/:index" component={DotDetail} />
          <Redirect to="/ksm" />
        </Switch>
      </Content>
      <Footer/>
    </Router>
  );
}

export default App;
