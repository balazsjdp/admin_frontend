import React, { useEffect } from 'react';
import './scss/app.scss';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

// Single components
import Navbar from './components/Navbar'

// Pages
import Dashboard from './pages/Dashboard'
import UserManagement from './pages/UserManagement'
import Posts from './pages/Posts'
import NotFound from './pages/NotFound'

// Functions
import {BASIC_FUNCTIONS} from './configuration/basic_functions';
const {getDatabaseStatus} = BASIC_FUNCTIONS

function App() {

  useEffect(() => {
    getDatabaseStatus()
  })


  return (
    <Router>
    <div className="App">
          <div id="navbar-container">
            <Navbar></Navbar>
          </div>
          <div id="content-container">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/user-management" component={UserManagement} />
              <Route exact path="/posts" component={Posts} />
              <Route component={NotFound} />
            </Switch>
          </div>        
    </div>
    </Router>
  );
}

export default App;


/*
 


*/