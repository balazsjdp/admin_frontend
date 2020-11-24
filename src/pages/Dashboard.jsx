import React, { useEffect } from 'react';
// Import Config
import {BASIC_CONFIG} from '../configuration/basic_config'
import {BASIC_FUNCTIONS} from '../configuration/basic_functions';
// Import Components
import PageTitle from '../components/PageTitle'
import { useState } from 'react';
import CountryFlag from '../components/CountryFlag'
import '../scss/pages/home.scss'
const {CallApi,SetPreferredLanguage} = BASIC_FUNCTIONS;

const Dashboard = () => {
    const [menuItems,setMenuItems] = useState()
    const [isLoading,setIsLoading] = useState()


    useEffect(() => {
        getInitialData()
    },[])

    const getInitialData = () => {
        /*CallApi({
            api: "api_frame.php?command=admin_menu_items",
            method : "GET",
            data: null,
            onSuccess: (data) => {
                setIsLoading(false)
                setMenuItems(data.message)
            },
            onError: () => {
                setIsLoading(false)
            }
        })*/
    }


    return ( <div className="dashboard">
        <div className="container-fluid">
            <div className="row title-wrapper">
                <div className="col-md-12">
                    <PageTitle type={BASIC_CONFIG.PAGES_TITLE_TAG} text="Home" />
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-3">
                    <h2>Visit sites:</h2>
                    <ul class="list-group mt-4">
                        <a href=""><li class="list-group-item"><CountryFlag size="24" country="en"/> noskobaby.com</li></a>
                        <a href=""><li class="list-group-item"><CountryFlag size="24" country="hu"/> noskobaby.hu</li></a>
                        <a href=""><li class="list-group-item"><CountryFlag size="24" country="ro"/> noskobaby.ro</li></a>
                        <a href=""><li class="list-group-item"><CountryFlag size="24" country="bg"/> noskobaby.bg</li></a>
                        <a href=""><li class="list-group-item"><CountryFlag size="24" country="rs"/> noskobaby.rs</li></a>
                        <a href=""><li class="list-group-item"><CountryFlag size="24" country="cz"/> noskobaby.cz</li></a>
                        <a href=""><li class="list-group-item"><CountryFlag size="24" country="sk"/> noskobaby.sk</li></a>
                    </ul>
                </div>
            </div>
        </div>
       
    </div> );
}
 
export default Dashboard;