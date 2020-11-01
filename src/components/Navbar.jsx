import React, { useEffect } from 'react';
import { useState } from 'react';
import "../scss/navbar.scss";
import FontawesomeIcon from './FontawesomeIcon';
import {Link} from "react-router-dom";
import {BASIC_FUNCTIONS} from '../configuration/basic_functions';
// Constants
const COLLAPSE_NAVBAR_TRESHOLD = 768

const {CallApi} = BASIC_FUNCTIONS;


const Navbar = (props) => {
    const [view,setView] = useState(window.innerWidth >= COLLAPSE_NAVBAR_TRESHOLD ? "extended" : "collapsed")
    const [menuItems,setMenuItems] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [activeItem,setActiveItem] = useState(window.location.pathname)


    let navTop = ''
    let navClass = ''
    let separatorClass = 'nav-separator'


    // Functions 
    /*const toggleTitles = (action) => {
        let titles = Array.from(document.getElementsByClassName('nav-item-title'))
        titles.forEach(title => {
            title.style.display = action === true ? 'inline-block' : 'none'
        })
    }*/

    const resizeWindow = () => {
        if(window.innerWidth <= COLLAPSE_NAVBAR_TRESHOLD){
            setView("collapsed")
        }else{
            if(view === 'extended') setView("extended")
        }
    }

    const formatView = () => {
        if(view === 'extended'){
            navTop =  (<div className="nav-top">
                            <p><FontawesomeIcon iconName="fas fa-user"/> balazsjdp</p>
                            <div onClick={() => setView("collapsed")} className="collapse-navigation">
                                <FontawesomeIcon iconName="fas fa-times"/>
                            </div>
                       </div>)
            
        }else{
            navClass = 'nav-collapsed'
            separatorClass = 'not-displayed'
            navTop =  (<div onClick={() => setView("extended")}  className="nav-top">
                        <p>
                        <FontawesomeIcon iconName="fas fa-bars"/></p>
                       </div>)
        }
    }

    // UseEffect hook
    useEffect(() => {
        CallApi({
            api: "api_frame.php?command=admin_menu_items",
            method : "GET",
            data: null,
            onSuccess: (data) => {
                formatView()
                setIsLoading(false)
                setMenuItems(data.message)
            },
            onError: () => {
                setIsLoading(false)
            }
        })



        window.addEventListener("resize", resizeWindow)
        return() => {window.removeEventListener("resize", resizeWindow)}
    },[])


    formatView()
   
    return( 
        <nav className={navClass}>
            {navTop}
            <div className={separatorClass}>Main menu</div>
            <ul className="nav-items">
                {isLoading ? <li className="nav-item"><FontawesomeIcon paddingRight={false} iconName="fas fa-circle-notch fa-spin"/></li> : menuItems ? menuItems.map(item => {
                    
                   return (
                   <Link key={item.menu_item_id} to={item.menu_item_link}>
                        <li onClick={() => setActiveItem(item.menu_item_link)} className={`nav-item ${activeItem === item.menu_item_link ? "active" : ""}`}><FontawesomeIcon paddingRight={true} iconName={item.menu_item_icon}/> 
                            <span className={`nav-item-title ${view === "extended" ? "inline-b" : "hidden"}`}>{item.menu_item_text}</span>
                        </li>
                    </Link>)

                }) : <li className="nav-item">Error Loading Menu items</li>}
            </ul>
            <div className={separatorClass}>User utilities</div>
            <ul className="nav-items">
                <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-key"/> <span className={`nav-item-title ${view === "extended" ? "inline-b" : "hidden"}`}>Change password</span></li>
                <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-sign-out-alt"/> <span className={`nav-item-title ${view === "extended" ? "inline-b" : "hidden"}`}>Logout</span></li>
            </ul>
        <span id="connection_status" title="Database connection status"><FontawesomeIcon iconName="fas fa-database"/></span>
        </nav>
    );
    

    
}
 
export default Navbar;