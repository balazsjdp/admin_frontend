import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css';

import App from './App';

(() => {
  console.log('hello')
})()


ReactDOM.render(
  <React.StrictMode>
    <Router basename="/nosko/admin">
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);