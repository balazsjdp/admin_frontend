import React from 'react';
// Import Config
import {BASIC_CONFIG} from '../configuration/basic_config'
import {BASIC_FUNCTIONS} from '../configuration/basic_functions'
// Import Components
import PageTitle from '../components/PageTitle'
import EditSiteText from '../components/EditSiteText'
import EditSiteMeta from '../components/EditSiteMeta'
import FontawesomeIcon from '../components/FontawesomeIcon';

// Import styles
import '../scss/pages/sitesettings.scss'
import { useState } from 'react';
import { useEffect } from 'react';
const {CallApi,TopAlert} = BASIC_FUNCTIONS;


const SiteSettings = (props) => {
    const [selectedTab,setSelectedTab] = useState("EditSiteText");
    const [pageList,setPageList] = useState();
    const [isLoading,setIsLoading] = useState(false)

    useEffect(() => {
        getPageList()
    },[])


    const getPageList = () => {
        setIsLoading(true)
        CallApi({
            api : "api_frame.php?command=pageList&lang=" + props.lang,
            method : "GET",
            data: null,
            onSuccess: (data) => {
                setPageList(data.message)
        setIsLoading(false)
            },
            onError: (err) => {
                TopAlert.fire({
                    icon: 'error',
                    title: "Error fetching some. Check console for more info!"
                })
                setIsLoading(false)
            }
        })
    }



    return ( <div className="posts">
        <div className="container-fluid">
            <div className="row title-wrapper">
                <div className="col-md-12">
                    <PageTitle type={BASIC_CONFIG.PAGES_TITLE_TAG} text={props.page ? props.page : 'Site Settings'} />
                </div>
            </div>
            <div className="row submenu-row">
                <div className="col-md-12">
                    <ul className="submenu">
                        <li><span className="submenu-help"><b>Global settings:</b> </span></li>
                        <li><a href="#" id="EditSiteText" onClick={(e) => setSelectedTab(e.target.id)} className={"EditSiteText" === selectedTab ? "active" : ""}> Site Text </a></li>
                        {isLoading ? <li><span><FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> Loading...</span></li> : pageList ? 
                        <div id="page-list"><ul><li><span className="submenu-help"><b>Edit page meta:</b> </span></li>
                            {
                                
                        pageList.map(page => 
                            (
                            <li>
                                <a href="#" id={`page-${page.id}`} onClick={(e) => setSelectedTab(e.target.id)} className={`page-${page.id}` === selectedTab ? "active" : ""}> {page.page_name} </a>
                            </li>
                            )
                        )}</ul></div> : <div id="page-list"><ul><li><span className="submenu-help"><b>Edit page meta:</b> </span></li><li><span><FontawesomeIcon iconName="fas fa-exclamation-triangle" /></span></li></ul></div>}
                    </ul>
                </div>
            </div>
            <div className="row mt-3">
                <div id="widget-container" className="col-md-12">
                    {selectedTab === "EditSiteText" ? <EditSiteText page={props.page} lang={props.lang} /> : <EditSiteMeta page={selectedTab} lang={props.lang} />}
                </div>
            </div>
        </div>
       
    </div> );
}
 
export default SiteSettings;