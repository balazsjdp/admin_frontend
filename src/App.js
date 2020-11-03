import React, { useEffect, useState } from 'react';
import './scss/app.scss';
import {BrowserRouter as Router,Switch,Route, } from "react-router-dom";

// Single components
import Navbar from './components/Navbar'

// Pages
import Dashboard from './pages/Dashboard'
import UserManagement from './pages/UserManagement'
import Posts from './pages/Posts'
import EditPost from './pages/EditPost'
import NotFound from './pages/NotFound'

// Functions
import {BASIC_FUNCTIONS} from './configuration/basic_functions';
const {getDatabaseStatus,TopAlert,SetPreferredLanguage,GetPreferredLanguage} = BASIC_FUNCTIONS

function App() {
  useEffect(() => {
    getDatabaseStatus();
    ManagePreferredLanguage();
    /*TopAlert.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })*/
  })


  let current_lang_preferred;
  const ManagePreferredLanguage = () => {
      let prefLangFromLS = GetPreferredLanguage();
      if(!prefLangFromLS){
        try{
          let langSelection = document.getElementsByClassName("lang-selection")[0];
          let selectedLang = Array.from(langSelection).filter(op => op.selected);
          SetPreferredLanguage(selectedLang[0].value)
          current_lang_preferred = selectedLang[0].value
        }catch(err){
          console.error(err)
        }
      }else{
        current_lang_preferred = prefLangFromLS
      }
  }
  ManagePreferredLanguage()




  return (
    <div className="App">
          <div id="navbar-container">
            <Navbar lang={current_lang_preferred}></Navbar>
          </div>
          <div id="content-container">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/user-management" component={UserManagement} />
              <Route exact path="/posts" component={() => <Posts lang={current_lang_preferred} />} />
              <Route path="/editPost/:postId" component={EditPost} />
              <Route component={NotFound} />
            </Switch>
          </div> 
        
    </div>
  );
}

export default App;


/*
 


*/