import React, { useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, } from 'react-router-dom'
import Header from "./pages/Header";
import styled from 'styled-components'
import Ksm from "./pages/Ksm";
import Dot from "./pages/Dot";
import Footer from "./pages/Footer";
import KsmDetail from "./pages/KsmDetail";
import DotDetail from "./pages/Dot/Detail";
import { useDispatch } from "react-redux";
import {
  fetchBounties,
  fetchKsmBountyCount,
  fetchKsmBountyDescriptions,
  fetchKsmProperties
} from "./store/reducers/ksmSlice";
import useFetchDot from "./pages/Dot/useFetchDot";

const Content = styled.div`
  display: flex;
  flex: 1;
  overflow-y: auto;
  
  & > div {
    padding-top: 16px;
    margin: 0 auto;
    
    @media screen and (min-width: 1140px) {
      width: 1128px;
    }
    
    @media screen and (max-width: 1140px) {
      width: 100%;
      margin-left: 20px;
      margin-right: 20px;
    }

  }
`;

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchKsmBountyCount())
    dispatch(fetchBounties())
    dispatch(fetchKsmProperties())
    dispatch(fetchKsmBountyDescriptions())
  }, [dispatch])

  useFetchDot()

  return (
    <Router basename={ process.env.NODE_ENV === "production" ? process.env.PUBLIC_URL : "/" }>
      <Header />
      <Content>
        <Switch>
          <Route exact path="/" component={Ksm} />
          <Route exact path="/ksm/:index" component={KsmDetail} />
          <Route exact path="/dot" component={Dot} />
          <Route exact path="/dot/:index" component={DotDetail} />
          <Redirect to="/" />
        </Switch>
      </Content>
      <Footer />
    </Router>
  );
}

export default App;
