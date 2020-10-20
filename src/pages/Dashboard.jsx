import React from 'react';
// Import Config
import {BASIC_CONFIG} from '../configuration/basic_config'
// Import Components
import PageTitle from '../components/PageTitle'

const Dashboard = () => {
    return ( <div className="dashboard">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <PageTitle type={BASIC_CONFIG.PAGES_TITLE_TAG} text="Dashboard" />

                </div>
            </div>
        </div>
       
    </div> );
}
 
export default Dashboard;