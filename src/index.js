import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from "./GlobalStyle";
import 'semantic-ui-css/semantic.min.css';
import { initKsmApi } from "./services/ksmApi";
import { Provider } from 'react-redux'
import store from './store'
import { initDotApi } from "./services/dotApi";

let nodeResolve;
const nodePromise = new Promise(resolve => {
  nodeResolve = resolve
});

window.onload = async () => {
  await Promise.all([await initKsmApi(), await initDotApi()])

  nodeResolve()
};

const render = () => {
  const loading = window.document.getElementById('loading');
  loading.parentNode.removeChild(loading);

  ReactDOM.render(
    <React.Fragment>
      <GlobalStyle />
      <Provider store={store}>
        <App />
      </Provider>
    </React.Fragment>,
    document.getElementById('root')
  );
};

nodePromise.then(render);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
