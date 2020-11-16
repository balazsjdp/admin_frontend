import React, { useEffect, useState } from 'react';
import './scss/app.scss';
import {BrowserRouter as Router,Switch,Route, } from "react-router-dom";

// Single components
import Navbar from './components/Navbar'
import FontawesomeIcon from './components/FontawesomeIcon'

// Pages
import Dashboard from './pages/Dashboard'
import UserManagement from './pages/UserManagement'
import Posts from './pages/Posts'
import EditPost from './pages/EditPost'
import NotFound from './pages/NotFound'
import SiteSettins from './pages/SiteSettings'
import Products from './pages/Products'
import EditProduct from './pages/EditProduct'

// Functions
import {BASIC_FUNCTIONS} from './configuration/basic_functions';
const {getDatabaseStatus,TopAlert,SetPreferredLanguage,GetPreferredLanguage,ShowTutorial} = BASIC_FUNCTIONS

function App() {
  useEffect(() => {
    getDatabaseStatus();
    ManagePreferredLanguage();
    //ShowTutorial()
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
              <Route exact path="/products" component={() => <Products lang={current_lang_preferred} />} />
              <Route exact path="/site-settings" component={() => <SiteSettins lang={current_lang_preferred} />} />
              <Route path="/editPost/:postId" component={EditPost} />
              <Route path="/editProduct/:productId" component={() => <EditProduct lang={current_lang_preferred} />} />
              <Route component={NotFound} />
            </Switch>
          </div> 
          <span onClick={ShowTutorial} id="show_tutorial" title="Click to show tutorial"><FontawesomeIcon iconName="fas fa-question-circle"/></span>
    </div>
  );
}

export default App;


/*
 


*/