import React from 'react';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
// Import Config
import {BASIC_FUNCTIONS} from '../configuration/basic_functions'
import {BASIC_CONFIG} from '../configuration/basic_config'
import FontawesomeIcon from './FontawesomeIcon';
import PageTitle from './PageTitle'
import CountryFlag from './CountryFlag'

const {CallApi,compareValues,TopAlert} = BASIC_FUNCTIONS;

const EditSiteMeta = (props) => {
    const [siteData, setSiteData] = useState();
    const [isLoading,setIsLoading] = useState(false)

   

    useEffect(() => {
        getInitialData()
    },[props.page])



    const getInitialData = () => {
        setIsLoading(true)
        CallApi({
            api : `api_frame.php?command=siteMeta&lang=${props.lang}&site=${props.page.split('-')[1]}`,
            method : "GET",
            data: null,
            onSuccess: (data) => {
                console.log(data)
                setSiteData(data.message[0])
                setIsLoading(false)
            },
            onError: (err) => {
                setIsLoading(false)
                TopAlert.fire({
                    icon: 'error',
                    title: "Error fetching info. Check console for more info!"
                })
            }
        })
    }

    const siteDataOnChange = (e) => {
        setSiteData({...siteData, [e.target.id] : e.target.value})
    }

    const saveSiteData = () => {
        CallApi({
            api : "api_frame.php",
            method : "POST",
            data: {
                command: 'saveSiteData',
                siteData: siteData,
              
            },
            onSuccess: (data) => {
                getInitialData()
                TopAlert.fire({
                    icon: 'success',
                    title: data.message
                })
            },
            onError: (err) => {
                
            }
        })
    }

   // getInitialData()

   if(siteData){
    return ( 
        <div className="siteMetaEditor">
             <div className="container-fluid">
                 <div className="row">
                     <div className="col-md-6">
                        {/*<label htmlFor="post-title">{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""} Page Data:</label> */}
                        
                     </div>
                 </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                       <div className="form-row row">
                            <div className="form-group col-md-6">
                                <label htmlFor="post-title">Page Title {isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""}</label>
                                <input onChange={siteDataOnChange} type="text" className="form-control" id="page_title" placeholder="Title" value={siteData.page_title}></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="post-title">Meta Description {isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""}</label>
                                <input onChange={siteDataOnChange} type="text" className="form-control" id="page_meta_description" placeholder="Meta description" value={siteData.page_meta_description}></input>
                            </div>
                       </div>
                       <div className="form-row row">
                            <div className="form-group col-md-2">
                                <button onClick={saveSiteData} className="buttn badge-green">Save</button>
                            </div>
                        </div>
                  </div>
                </div>
            </div>
        </div>
     )
   }else{
    return (<div className="siteMetaEditor">
    <div className="container-fluid">
        <div className="row title-wrapper">
            <div className="col-md-12">
                <h2>Loading <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /></h2>
            </div>
        </div>
    </div>
</div>)
   }
}
 
export default EditSiteMeta;