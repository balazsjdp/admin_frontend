import React from 'react';
// Import Config
import {BASIC_CONFIG} from '../configuration/basic_config'
// Import Components
import PageTitle from '../components/PageTitle'
import ProductManagement from '../components/ProductManagement'

// Import styles
import '../scss/pages/posts.scss'
import { useState } from 'react';



const Products = (props) => {
    const [selectedTab,setSelectedTab] = useState("ProductManagement");

    return ( <div className="posts">
        <div className="container-fluid">
            <div className="row title-wrapper">
                <div className="col-md-12">
                    <PageTitle type={BASIC_CONFIG.PAGES_TITLE_TAG} text="Products" />
                </div>
            </div>
            <div className="row submenu-row">
                <div className="col-md-6">
                    <ul className="submenu">
                        <li><a href="#" id="ProductManagement" onClick={(e) => setSelectedTab(e.target.id)} className={"ProductManagement" === selectedTab ? "active" : ""}> Products</a></li>
                    </ul>
                </div>
            </div>
            <div className="row mt-3">
                <div id="widget-container" className="col-md-12">
                    {selectedTab === "ProductManagement" ? <ProductManagement lang={props.lang} /> : ""}
                </div>
            </div>
        </div>
       
    </div> );
}
 
export default Products;