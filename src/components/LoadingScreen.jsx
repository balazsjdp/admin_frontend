import React, { Component } from 'react';
import {BASIC_CONFIG} from '../configuration/basic_config'
import Fade from 'react-reveal/Fade';

const LoadingScreen = (props) => {
    return ( 
        <Fade big when={props.loading}>
            <div className="loading-screen">
                <div className="loader-image-wrapper">
                    <img src={BASIC_CONFIG.IMAGES_PATH + "/loading.svg"} alt="" srcset=""/>
                </div>
            </div>
        </Fade>
     );
}
 
export default LoadingScreen;