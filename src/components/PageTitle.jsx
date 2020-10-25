import React from 'react';


const PageTitle = (props) => {
    if(props.type.substring(0,1) !== "h")
        throw new Error("Component: PageTitle. Error: This component accepts only heading tags. h1,h2, etc..");


    return ( 
        <props.type id="page-title" className="page-title">{props.text}</props.type>
     );
}
 
export default PageTitle;