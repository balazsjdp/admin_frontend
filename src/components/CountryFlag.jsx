import React from 'react';
import {BASIC_CONFIG} from '../configuration/basic_config'

const {FLAGS_PATH} = BASIC_CONFIG


const CountryFlag = (props) => {
    console.log(props)
    return ( 

        <img src={`${FLAGS_PATH}/${props.size}/${props.country}.png`} alt=""/>
    
    );
}
 
export default CountryFlag;