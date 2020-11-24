import React, { useEffect } from 'react';
// Import Config
import {BASIC_CONFIG} from '../configuration/basic_config'
import {BASIC_FUNCTIONS} from '../configuration/basic_functions';
// Import Components
import PageTitle from '../components/PageTitle'
import { useState } from 'react';
import CountryFlag from '../components/CountryFlag'
import LoadingScreen from '../components/LoadingScreen'
import FontawesomeIcon from '../components/FontawesomeIcon';
import '../scss/pages/home.scss'
const {CallApi,SetPreferredLanguage,TopAlert} = BASIC_FUNCTIONS;

const Login = () => {
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [isLoading,setIsLoading] = useState(false)


    const handleSetEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleSetPassword = (e) => {
        setPassword(e.target.value)
    }

    const login = () => {

        if(!email || !password){
            TopAlert.fire({
                icon: 'error',
                title: 'Please enter your email address and password!'
            })

            return;
        }

        setIsLoading(true)
        CallApi({
            api: "auth.php",
            method: "POST",
            data:{
                command: 'login',
                email: email,
                password: password
            },
            onSuccess:(data) => {
                setIsLoading(false)
                if(data.success){
                    localStorage.setItem("accessToken",data.message)
                    window.location.reload()
                }else{
                    TopAlert.fire({
                        icon: 'error',
                        title: 'Failed to Login: ' + data.message
                    })
                    setPassword("")
                }
            },
            onError: (err) => {
                TopAlert.fire({
                    icon: 'error',
                    title: 'Failed to Login. Check console for details!'
                })
            }
        })
    }

    if(isLoading){
        return(<LoadingScreen loading={isLoading} />)
    }


    return ( 
    <div className="dashboard">
        <div className="container-fluid">
            <div className="row title-wrapper">
                <div className="col-md-12">
                    <PageTitle type={BASIC_CONFIG.PAGES_TITLE_TAG} text="Login" />
                </div>
            </div>

            <div className="row mt-4">
                <div className="form-group col-md-4">
                    <label htmlFor="post_tags_label">{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""} Email </label>
                    <input 
                        className="form-control"
                        value={email}
                        onChange={handleSetEmail}
                        type="email" 
                        id="email">
                    </input>
                </div>
            </div>
            <div className="row mt-2">
                <div className="form-group col-md-4">
                    <label htmlFor="post_tags_label">{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""} Password </label>
                    <input 
                        className="form-control"
                        value={password}
                        onChange={handleSetPassword}
                        type="password" 
                        id="password">
                    </input>
                </div>
            </div>
            <button onClick={login} className="buttn badge-green">Login</button>
        </div>
       
    </div> );
}
 
export default Login;