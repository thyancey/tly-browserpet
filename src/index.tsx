import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './containers/app';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import './themes/fonts.css';
import GlobalStyle from './themes/';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <GlobalStyle />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
