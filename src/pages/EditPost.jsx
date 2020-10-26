import React, {useEffect} from 'react';
// Import Config
import {BASIC_CONFIG} from '../configuration/basic_config'
import {BASIC_FUNCTIONS} from '../configuration/basic_functions'
// Import Components
import PageTitle from '../components/PageTitle'
import { Editor } from '@tinymce/tinymce-react';
import FontawesomeIcon from '../components/FontawesomeIcon';
import MultiSelect from "react-multi-select-component";

// Import styles
import '../scss/pages/editpost.scss'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
const {CallApi,compareValues} = BASIC_FUNCTIONS;
const {POST_LANGS} = BASIC_CONFIG




const EditPost = () => {
    const [isLoading,setIsLoading] = useState(true);
    const [postData,setPostData] = useState();
    const [postCategories, setPostCategories] = useState()
    const {postId} = useParams()


    useEffect(() => {
        CallApi({
            api : "api_frame.php?command=postData&postId=" + postId,
            method : "GET",
            data: null,
            onSuccess: (data) => {
                setIsLoading(false)
                setPostData(data.message[0])
                console.log(data.message[0])
            },
            onError: (err) => {
                setIsLoading(false)
                console.log("error")
            }
        })
        CallApi({
            api : "api_frame.php?command=postCategories",
            method : "GET",
            data: null,
            onSuccess: (data) => {
                setIsLoading(false)
                setPostCategories(data.message)
            },
            onError: (err) => {
                setIsLoading(false)
                console.log("error")
            }
        })

    },[])

    const postDataOnChange = (e) => {   
        setPostData({...postData, [e.target.id] : e.target.value})
    }


/* 
post_body: "Exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
post_id: "4"
post_is_draft: "1"
post_is_featured: "0"
post_lang: "en"
post_tags: "nasal hygenie"
post_timestamp: "2020-10-23 13:11:33"
post_title: "spray for nasal hygiene"


*/


    if(postData){
        return (<div className="postEditor">
                    <div className="container-fluid">
                        <div className="row title-wrapper">
                            <div className="col-md-12">
                                <PageTitle type={BASIC_CONFIG.PAGES_TITLE_TAG} text={isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : postData.post_title} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <div id="post-data">
                                    <div className="form-row">
                                        <div className="form-group col-md-6 order-2 order-md-1">
                                            <label htmlFor="post-title">{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""} Title</label>
                                            <input onChange={postDataOnChange} type="email" className="form-control" id="post_title" placeholder="Title" value={postData.post_title}></input>
                                            <label id="options-label" >Options</label>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className="form-check">
                                                        <input className="form-check-input" checked={postData.post_is_draft === "1" ? true : false} type="checkbox" id="post_is_draft"></input>
                                                        <label className="form-check-label" htmlFor="post_is_draft">
                                                            Draft
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" checked={postData.post_is_featured === "1" ? true : false} type="checkbox" id="post_is_featured"></input>
                                                        <label className="form-check-label" htmlFor="post_is_featured">
                                                            Featured
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-6 text-right order-1 order-md-2">
                                            <img id="featured-image" src={`data:image/png;base64,${postData.image}`} alt=""/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-3">
                                            <label htmlFor="post_lang_label">{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""} Language</label>
                                            <select defaultValue={postData.post_lang} onChange={postDataOnChange} className="form-control" id="post_lang">
                                                {POST_LANGS.split(',').map(lang => {
                                                    return <option key={lang} value={lang}>{lang}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="post_tags_label">{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""} Category</label>
                                            <select defaultValue={postData.post_tags} onChange={postDataOnChange} className="form-control" id="post_tags">
                                                {postCategories ? postCategories.map(cat => {
                                                    return <option key={cat.tag} value={cat.tag}>{cat.tag}</option>
                                                }) : ""}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="post-body">{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""} Body</label>
                                            <Editor
                                                initialValue={postData.post_body}
                                                id="post_body"
                                                init={{
                                                    height: 450,
                                                    paste_data_images: true,
                                                    resize: false,
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
                                            onChange={postDataOnChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form row">
                                        <div className="form-group col-md-2">
                                            <button className="buttn badge-green">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  );
    }else{
        return (<div className="postEditor">
        <div className="container-fluid">
            <div className="row title-wrapper">
                <div className="col-md-12">
                    <PageTitle type={BASIC_CONFIG.PAGES_TITLE_TAG} text="Error" />
                </div>
            </div>
        </div>
    </div>)
    }
    
}
 
export default EditPost;