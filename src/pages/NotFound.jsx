import React from 'react';
// Import Config
import {BASIC_CONFIG} from '../configuration/basic_config'
// Import Components
import PageTitle from '../components/PageTitle'

const NotFound = () => {
    return ( <div className="notfound">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <PageTitle type={BASIC_CONFIG.PAGES_TITLE_TAG} text="Not Found" />

                </div>
            </div>
        </div>
       
    </div> );
}
 
export default NotFound;