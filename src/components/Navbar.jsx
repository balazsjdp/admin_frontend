import React from 'react';
import { useState } from 'react';
import "../scss/navbar.scss";
import FontawesomeIcon from './FontawesomeIcon';


const COLLAPSE_NAVBAR_TRESHOLD = 768




const Navbar = (props) => {
    const [view,setView] = useState("extended")

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
            setView("extended")
        }
    }

    if(view === 'extended'){
        setTimeout(() => {
            toggleTitles(true)
        }, 100);
        return ( 
            <nav>
                <div className="nav-top">
                    <p>
                    <FontawesomeIcon iconName="fas fa-user"/> balazsjdp</p>
                    <div onClick={() => setView("collapsed")} className="collapse-navigation">
                    <FontawesomeIcon iconName="fas fa-times"/>
                </div>
                </div>
                <div className="nav-separator">Main menu</div>
                <ul className="nav-items">
                    <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-users"/> <span className="nav-item-title">First</span></li>
                    <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-book-open"/> <span className="nav-item-title">Second</span></li>
                    <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-align-left"/> <span className="nav-item-title">Third</span></li>
                    <li className="nav-item disabled"><FontawesomeIcon paddingRight={true} iconName="fas fa-ad"/> <span className="nav-item-title">Fourth</span></li>
                    <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fab fa-apple"/> <span className="nav-item-title">Fifth</span></li>
                </ul>
                <div className="nav-separator">User utilities</div>
                <ul className="nav-items">
                    <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-key"/> Change password</li>
                    <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-sign-out-alt"/> Logout</li>
                </ul>

            </nav>

        );
    }else{
        setTimeout(() => {
            toggleTitles(false)

        }, 200);
        return ( 
            <nav className="nav-collapsed">
                <div onClick={() => setView("extended")}  className="nav-top">
                    <p>
                    <FontawesomeIcon iconName="fas fa-bars"/></p>
                </div>
                <div className="nav-separator nav-separator-collapsed"></div>
                <ul className="nav-items">
                    <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-users"/> <span className="nav-item-title">First</span></li>
                    <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-book-open"/> <span className="nav-item-title">Second</span></li>
                    <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-align-left"/> <span className="nav-item-title">Third</span></li>
                    <li className="nav-item disabled"><FontawesomeIcon paddingRight={true} iconName="fas fa-ad"/> <span className="nav-item-title">Fourth</span></li>
                    <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fab fa-apple"/> <span className="nav-item-title">Fifth</span></li>
                </ul>
                <div className="nav-separator nav-separator-collapsed"></div>
                <ul className="nav-items">
                    <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-key"/></li>
                    <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-sign-out-alt"/></li>
                </ul>
            </nav>
        );
    }

    
}
 
export default Navbar;