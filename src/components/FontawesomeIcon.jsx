import React from 'react';

let padding_right_style = {"padding-right": "1em"}

const FontawesomeIcon = (props) => {
    return ( 

    <i style={props.paddingRight ? padding_right_style : null} className={props.iconName}></i>
    
    );
}
 
export default FontawesomeIcon;