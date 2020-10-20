import React from 'react';
// Import Config
import {BASIC_CONFIG} from '../configuration/basic_config'
// Import Components
import PageTitle from '../components/PageTitle'


const Posts = () => {
    return ( <div className="posts">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <PageTitle type={BASIC_CONFIG.PAGES_TITLE_TAG} text="Posts" />

                </div>
            </div>
        </div>
       
    </div> );
}
 
export default Posts;