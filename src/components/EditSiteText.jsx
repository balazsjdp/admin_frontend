import React from 'react';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
// Import Config
import {BASIC_FUNCTIONS} from '../configuration/basic_functions'
import FontawesomeIcon from './FontawesomeIcon';
import CountryFlag from './CountryFlag'
import { Editor } from '@tinymce/tinymce-react';
import { BASIC_CONFIG } from '../configuration/basic_config';
import Swal from 'sweetalert2';

const {TINYMCE_API_KEY} = BASIC_CONFIG
const {CallApi,compareValues,TopAlert} = BASIC_FUNCTIONS;

const EditSiteText = (props) => {
    const [state,setState] = useState({textData: null})
    const [isLoading,setIsLoading] = useState(false)
    const lang = props.lang


    useEffect(() => {
        getInitialData()
    },[])

    const getInitialData = () => {
        setIsLoading(true)
        CallApi({
            api : "api_frame.php?command=siteText&lang=" + props.lang,
            method : "GET",
            data: null,
            onSuccess: (data) => {
                console.log(data)
                setState({textData : data.message})
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

    const onTextChange = (e) => {

        let NEW_TEXTS = state.textData 

        let textObject =  NEW_TEXTS.filter(text => text.dom_id == e.target.id)
        textObject[lang] = e.target.value
        let indexOftextObject = NEW_TEXTS.indexOf(textObject[0])
        NEW_TEXTS[indexOftextObject][lang] = e.target.value
      
        setState({textData: NEW_TEXTS})
    }

    const onTextAreaOnChange = (content, editor) => {
        let NEW_TEXTS = state.textData 
        let textObject =  NEW_TEXTS.filter(text => text.dom_id == editor.id)
        textObject[lang] = content
        let indexOftextObject = NEW_TEXTS.indexOf(textObject[0])
        NEW_TEXTS[indexOftextObject][lang] = content

        setState({textData: NEW_TEXTS})
    }

    const saveTexts = () => {
        setIsLoading(true)
        CallApi({
            api : "api_frame.php",
            method : "POST",
            data: {
                command: 'saveTexts',
                textData: state.textData,
                lang: lang
            },
            onSuccess: (data) => {
                setIsLoading(false)
                TopAlert.fire({
                    icon: 'success',
                    title: "Changes saved successfully!"
                })
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


    return ( 
        <div className="container-fluid">
            <div className="row">
               <div className="col-12">
                    <div id="post-list" className="widget-panel">
                        <div className="widget-panel-title">
                            <div className="row ">
                                <div className="col-md-3 text-left"><strong>Description</strong></div>
                                <div className="col-md-9 text-left"><strong>Text on the  <CountryFlag size="24" country={props.lang} /> site</strong></div>
                            </div>
                        </div>
                        <div className="widget-body">
                            <div id="text_data">
                               
                                {state.textData ? state.textData.map(text => (
                                   <div key={text.dom_id} className="row mb-4">
                                       <div className="col-md-3 text_description_wrapper">
                                            <span className="text_description">{text.dom_id}</span>
                                       </div>
                                       <div className="col-md-8">
                                            {text[lang].length > 150 ? 
                                                <Editor
                                                apiKey= {TINYMCE_API_KEY}
                                                initialValue={text[lang]}
                                                id={text.dom_id}
                                                
                                                init={{
                                                    height: 450,
                                                    paste_data_images: true,
                                                    resize: false,
                                                    mode : "textareas",
                                                    force_br_newlines : true,
                                                    force_p_newlines : false,
                                                    forced_root_block : '',
                                                    menubar: false,
                                                    plugins: [
                                                        'advlist autolink lists link image charmap print preview anchor',
                                                        'searchreplace visualblocks code fullscreen',
                                                        'insertdatetime media table paste code help wordcount'
                                                    ],
                                                    toolbar:
                                                        'undo redo | formatselect | bold italic backcolor | \
                                                        alignleft aligncenter alignright alignjustify | \
                                                        bullist numlist outdent indent | removeformat | help'
                                            }}
                                            onEditorChange={onTextAreaOnChange}
                                            />
                                            : <input id={text.dom_id} onChange={onTextChange} type="text" value={text[lang]} className="form-control"/> }

                                            
                                       </div>
                                   </div>
                                )) : ""}
                            </div>
                        </div>
                    </div>
               </div>
               <div className="col-md-12 text-center mt-3">
                    <button onClick={saveTexts} className="buttn badge-green"><FontawesomeIcon iconName="fas fa-save" /> Save Changes</button>     
               </div>
            </div>
            {isLoading ? <div className="loading-indicator">Loading <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /></div> : ""}
        </div>
     );
}
 
export default EditSiteText;