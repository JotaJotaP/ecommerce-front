import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
// import App from './App';
import Routes from "./Routes"
import './size.css'

ReactDOM.render(
  <BrowserRouter basename="/ecommerce-front">
    <Routes />
  </BrowserRouter>,
    document.getElementById('root')
);
