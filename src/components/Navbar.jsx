import React from 'react';
import { useState } from 'react';
import "../scss/navbar.scss";
import FontawesomeIcon from './FontawesomeIcon';
import {Link} from "react-router-dom";
import Dashboard from '../pages/Dashboard'

// Constants
const COLLAPSE_NAVBAR_TRESHOLD = 768



const Navbar = (props) => {
    const [view,setView] = useState("extended")
    let navTop = ''
    let navClass = ''
    let separatorClass = 'nav-separator'

    function toggleTitles(action){
        let titles = Array.from(document.getElementsByClassName('nav-item-title'))
        titles.forEach(title => {
            title.style.display = action === true ? 'inline-block' : 'none'
        })
    }

    
    window.onresize = () => {
        if(window.innerWidth <= COLLAPSE_NAVBAR_TRESHOLD){
            setView("collapsed")
        }else{
            if(view === 'extended') setView("extended")
        }
    }

    
    if(view === 'extended'){
        toggleTitles(true)
        navTop =  (<div className="nav-top">
                        <p><FontawesomeIcon iconName="fas fa-user"/> balazsjdp</p>
                        <div onClick={() => setView("collapsed")} className="collapse-navigation">
                            <FontawesomeIcon iconName="fas fa-times"/>
                        </div>
                   </div>)
        
    }else{
        toggleTitles(false)
        navClass = 'nav-collapsed'
        separatorClass = 'not-displayed'
        navTop =  (<div onClick={() => setView("extended")}  className="nav-top">
                    <p>
                    <FontawesomeIcon iconName="fas fa-bars"/></p>
                   </div>)
    }

    return( 
        <nav className={navClass}>
            {navTop}
            <div className={separatorClass}>Main menu</div>
            <ul className="nav-items">
                <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-home"/> <span className="nav-item-title"><Link to={Dashboard}>Dashboard</Link></span></li>
                <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-users"/> <span className="nav-item-title">User Management</span></li>
                <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-sticky-note"/> <span className="nav-item-title">Posts</span></li>
                <li className="nav-item disabled"><FontawesomeIcon paddingRight={true} iconName="fas fa-ad"/> <span className="nav-item-title">Fourth</span></li>
                <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fab fa-apple"/> <span className="nav-item-title">Fifth</span></li>
            </ul>
            <div className={separatorClass}>User utilities</div>
            <ul className="nav-items">
                <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-key"/> <span className="nav-item-title">Change password</span></li>
                <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-sign-out-alt"/> <span className="nav-item-title">Logout</span></li>
            </ul>
        <span id="connection_status" title="Database connection status"><FontawesomeIcon iconName="fas fa-database"/></span>
        </nav>
    );
    

    
}
 
export default Navbar;