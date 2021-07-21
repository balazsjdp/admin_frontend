import React, { useEffect, useState } from 'react';
import './scss/app.scss';
import {BrowserRouter as Router,Switch,Route, } from "react-router-dom";
import Fade from 'react-reveal/Fade';
// Single components
import Navbar from './components/Navbar'
import FontawesomeIcon from './components/FontawesomeIcon'
import LoadingScreen from './components/LoadingScreen'

// Pages
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import UserManagement from './pages/UserManagement'
import Posts from './pages/Posts'
import EditPost from './pages/EditPost'
import NotFound from './pages/NotFound'
import SiteSettins from './pages/SiteSettings'
import Products from './pages/Products'
import EditProduct from './pages/EditProduct'

// Functions
import {BASIC_CONFIG} from './configuration/basic_config'
import {BASIC_FUNCTIONS} from './configuration/basic_functions';
const {getDatabaseStatus,TopAlert,CallApi,SetPreferredLanguage,GetPreferredLanguage,ShowTutorial} = BASIC_FUNCTIONS
const {DEFAULT_PREFERRED_LANG} = BASIC_CONFIG

function App() {
  const [isLoading, setIsLoading] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    checkIfUserIsAuthorized()
    getDatabaseStatus();
    ManagePreferredLanguage();
    //ShowTutorial()
    /*TopAlert.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })*/
  },[])


  let current_lang_preferred;
  const ManagePreferredLanguage = () => {
      let prefLangFromLS = GetPreferredLanguage();
      if(!prefLangFromLS){
        try{
          SetPreferredLanguage(DEFAULT_PREFERRED_LANG)
          current_lang_preferred = DEFAULT_PREFERRED_LANG
        }catch(err){
          console.error(err)
        }
      }else{
        current_lang_preferred = prefLangFromLS
      }
  }
  ManagePreferredLanguage()


  const checkIfUserIsAuthorized = () => {
    setIsLoading(true);
    CallApi({
      api: "auth.php",
      method: 'POST',
      data: {
        command: 'checkIfAuthorized',
        token: localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null
      },
      onSuccess: (data) => {
          if(!data.success){
            setIsLoggedIn(false);
            setIsLoading(false)
          }else{
            setIsLoggedIn(true)
            setIsLoading(false)
          }

      
      },
      onError: (err) => {
        console.log(err)
      }
    })
  }

  if(isLoading){
    return(<LoadingScreen loading={isLoading} />)
  }else{
    if(isLoggedIn){
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
                  <Route exact path="/edit-faq" component={() => <SiteSettins page="Faq" lang={current_lang_preferred} />} />
                  <Route exact path="/edit-about" component={() => <SiteSettins page="About" lang={current_lang_preferred} />} />
                  <Route path="/editPost/:postId" component={EditPost} />
                  <Route path="/editProduct/:productId" component={() => <EditProduct lang={current_lang_preferred} />} />
                  <Route component={NotFound} />
                </Switch>
              </div> 
              
        </div>
      );
    }else{
      return (
        <div className="App">
           <Login />
        </div>
      )
    }
  }

}

export default App;


/*
 
<span onClick={ShowTutorial} id="show_tutorial" title="Click to show tutorial"><FontawesomeIcon iconName="fas fa-question-circle"/></span>

*/