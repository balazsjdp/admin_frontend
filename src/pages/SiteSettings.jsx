import React from 'react';
// Import Config
import {BASIC_CONFIG} from '../configuration/basic_config'
// Import Components
import PageTitle from '../components/PageTitle'
import EditSiteText from '../components/EditSiteText'
import EditSiteMeta from '../components/EditSiteMeta'

// Import styles
import '../scss/pages/sitesettings.scss'
import { useState } from 'react';



const SiteSettings = (props) => {
    const [selectedTab,setSelectedTab] = useState("EditSiteText");

    return ( <div className="posts">
        <div className="container-fluid">
            <div className="row title-wrapper">
                <div className="col-md-12">
                    <PageTitle type={BASIC_CONFIG.PAGES_TITLE_TAG} text="Site Settings" />
                </div>
            </div>
            <div className="row submenu-row">
                <div className="col-md-6">
                    <ul className="submenu">
                        <li><a href="#" id="EditSiteText" onClick={(e) => setSelectedTab(e.target.id)} className={"EditSiteText" === selectedTab ? "active" : ""}> Site Text</a></li>
                        <li><a href="#" id="EditSiteMeta" onClick={(e) => setSelectedTab(e.target.id)} className={"EditSiteMeta" === selectedTab ? "active" : ""}> Site Meta</a></li>
                    </ul>
                </div>
            </div>
            <div className="row mt-3">
                <div id="widget-container" className="col-md-12">
                    {selectedTab === "EditSiteText" ? <EditSiteText lang={props.lang} /> : <EditSiteMeta lang={props.lang} />}
                </div>
            </div>
        </div>
       
    </div> );
}
 
export default SiteSettings;