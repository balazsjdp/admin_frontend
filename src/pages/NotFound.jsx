import React from 'react';
// Import Config
import {BASIC_CONFIG} from '../configuration/basic_config'
// Import Components
import PageTitle from '../components/PageTitle'
import FontawesomeIcon from '../components/FontawesomeIcon'

const NotFound = () => {
    return ( <div className="notfound">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 text-center mt-5">
                    <h1><FontawesomeIcon iconName="fas fa-exclamation-triangle"/> 404 Page Not Found</h1>
                </div>
            </div>
        </div>
       
    </div> );
}
 
export default NotFound;