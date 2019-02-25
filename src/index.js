import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './App';
import { createStore } from "redux";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
  <Provider>
    <App displaytext="hello"/>
  </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
