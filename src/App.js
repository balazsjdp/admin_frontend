import React from 'react';
import './scss/app.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import Navbar from './components/Navbar'


import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="App">
          <div id="navbar-container">
            <Navbar></Navbar>
          </div>
          <div id="content-container">
          <Router>
            <Switch>
              <Route path="/">
                <Dashboard />
              </Route>
            </Switch>
          </Router>
          </div>        
    </div>
  );
}

export default App;
