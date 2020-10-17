import React from 'react';
import "../scss/navbar.scss";
import FontawesomeIcon from './FontawesomeIcon';

const Navbar = () => {
    return ( 
    <nav className="col-6 col-md-2">
        <div className="nav-top">
            <p>
            <FontawesomeIcon iconName="fas fa-user"/> balazsjdp</p>
        </div>
        <div className="nav-separator">Main menu</div>
        <ul className="nav-items">
            <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-users"/> First</li>
            <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-book-open"/> Second</li>
            <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-align-left"/> Third</li>
            <li className="nav-item disabled"><FontawesomeIcon paddingRight={true} iconName="fas fa-ad"/> Fourth</li>
            <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fab fa-apple"/> Fifth</li>
        </ul>
        <div className="nav-separator">User utilities</div>
        <ul className="nav-items">
            <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-key"/> Change password</li>
            <li className="nav-item"><FontawesomeIcon paddingRight={true} iconName="fas fa-sign-out-alt"/> Logout</li>
            
        </ul>
    </nav>);
}
 
export default Navbar;