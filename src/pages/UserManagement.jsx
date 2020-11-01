import React from 'react';
// Import Config
import {BASIC_CONFIG} from '../configuration/basic_config'
// Import Components
import PageTitle from '../components/PageTitle'
import PostManagement from '../components/PostManagement'
import FontawesomeIcon from '../components/FontawesomeIcon'


// Import styles
import '../scss/pages/posts.scss'
import { useState } from 'react';



const UserManagement = () => {
    const [selectedTab,setSelectedTab] = useState("PostManagement");

    return ( <div className="posts">
        <div className="container-fluid">
            <div className="row title-wrapper">
                <div className="col-md-12">
                    <PageTitle type={BASIC_CONFIG.PAGES_TITLE_TAG} text="User Management" />
                </div>
            </div>
           
            <div className="row mt-3">
                <div id="widget-container" className="col-md-12">
                  <div className="row">
                   <div className="col-md-3">
                        <div id="user-actions" className="widget-panel">
                                <div className="widget-panel-title">
                                    Actions
                                </div>
                                <div className="widget-body">
                                    <h3><span className="buttn badge-green"><FontawesomeIcon iconName="fas fa-user-plus" /> New User</span></h3>
                                </div>
                        </div>
                   </div>
                  </div>
                  <div className="row">
                      <div className="col-md-12">
                        <div id="user-list" className="widget-panel">
                            <div className="widget-panel-title">
                                User List
                            </div>
                            <div className="widget-body">
                               
                            </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
        </div>
       
    </div> );
}
 
export default UserManagement;