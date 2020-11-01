import React from 'react';
// Import Config
import {BASIC_CONFIG} from '../configuration/basic_config'
// Import Components
import PageTitle from '../components/PageTitle'
import PostManagement from '../components/PostManagement'

// Import styles
import '../scss/pages/posts.scss'
import { useState } from 'react';



const Posts = () => {
    const [selectedTab,setSelectedTab] = useState("PostManagement");

    return ( <div className="posts">
        <div className="container-fluid">
            <div className="row title-wrapper">
                <div className="col-md-12">
                    <PageTitle type={BASIC_CONFIG.PAGES_TITLE_TAG} text="Posts" />
                </div>
            </div>
            <div className="row submenu-row">
                <div className="col-md-6">
                    <ul className="submenu">
                        <li><a href="#" id="PostManagement" onClick={(e) => setSelectedTab(e.target.id)} className={"PostManagement" === selectedTab ? "active" : ""}> Posts</a></li>
                    </ul>
                </div>
            </div>
            <div className="row mt-3">
                <div id="widget-container" className="col-md-12">
                    {selectedTab === "PostManagement" ? <PostManagement /> : ""}
                </div>
            </div>
        </div>
       
    </div> );
}
 
export default Posts;