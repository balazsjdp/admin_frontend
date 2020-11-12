import React, {Fragment, useEffect} from 'react';
// Import Config
import {BASIC_CONFIG} from '../configuration/basic_config'
import {BASIC_FUNCTIONS} from '../configuration/basic_functions'
// Import Components
import PageTitle from '../components/PageTitle'
import { Editor } from '@tinymce/tinymce-react';
import FontawesomeIcon from '../components/FontawesomeIcon';
import CountryFlag from '../components/CountryFlag'
import Swal from 'sweetalert2'


// Import styles
import '../scss/pages/editpost.scss'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
const {CallApi,TopAlert} = BASIC_FUNCTIONS;
const {POST_LANGS,TINYMCE_API_KEY} = BASIC_CONFIG



const EditPost = () => {
    const [isLoading,setIsLoading] = useState(true);
    const [postData,setPostData] = useState();
    const [postCategories, setPostCategories] = useState()
    const {postId} = useParams()
    const [isDraft,setIsDraft] = useState()
    const [isFeatured,setIsFeatured] = useState()
    const [postBody,setPostBody] = useState()
    const [postSlug,setPostSlug] = useState()
    const [automaticSlug,setAutomaticSlug] = useState(true)

    useEffect(() => {
        getInitialData()
    
    },[])

    

    const getInitialData = () => {
        CallApi({
            api : "api_frame.php?command=postData&postId=" + postId,
            method : "GET",
            data: null,
            onSuccess: (data) => {
                console.log(data)
                setIsLoading(false)
                setPostData(data.message[0])
                setIsFeatured(data.message[0].post_is_featured === "1" ? true : false)
                setIsDraft(data.message[0].post_is_draft === "1" ? true : false)
                setPostBody(data.message[0].post_body)
                setPostSlug(data.message[0].post_slug)
            },
            onError: (err) => {
                setIsLoading(false)
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
            }
        })
    }

    const deleteFeaturedImage = () => {
        setIsLoading(true);
        Swal.fire({
            title: 'Are you sure that you want to remove the featured image?',
            showCancelButton: true,
            confirmButtonText: `Yes`,
          }).then((result) => {
            if (result.isConfirmed) {
                CallApi({
                    api : "api_frame.php",
                    method : "POST",
                    data: {
                        command: 'removeFeaturedImage',
                        postId: postId
                    },
                    onSuccess: (data) => {
                        getInitialData()
                        TopAlert.fire({
                            icon: 'success',
                            title: 'Image deleted successfully!'
                        })
                    },
                    onError: (err) => {
                        setIsLoading(false)
                        TopAlert.fire({
                            icon: 'error',
                            title: 'Error deleting image. See the console for more info!'
                        })
                    }
                })
            }
          })
    }

    const changeFeaturedImage = async () => {
        const { value: file } = await Swal.fire({
            title: 'Select an image to upload',
            input: 'file',
            inputAttributes: {
              'accept': 'image/*',
              'aria-label': 'Upload featured image'
            }
          })
          
          if (file) {
            const reader = new FileReader()
            const formData = new FormData()
            reader.onload = (e) => {
                formData.append('file',e.target.result)
                formData.append('command','featuredImageUpload')
                formData.append('postId', postId)
                setIsLoading(true);
                CallApi({
                    api : "file_upload.php",
                    method : "POST",
                    data: formData,
                    headers: {'content-type': 'multipart/form-data'},
                    onSuccess: (data) => {
                        getInitialData()
                        TopAlert.fire({
                            icon: 'success',
                            title: 'Image uploaded successfully!'
                        })
                    },
                    onError: (err) => {
                        setIsLoading(false)
                        TopAlert.fire({
                            icon: 'error',
                            title: 'Upload failed. See the console for more info!'
                        })
                    }
                })

            }
            reader.readAsDataURL(file)
          }
    }

    const savePost = () => {
        delete postData.post_featured_image;
        CallApi({
            api : "api_frame.php",
            method : "POST",
            data: {
                command: 'savePost',
                postData: postData,
                isFeatured: isFeatured,
                isDraft: isDraft,
                postBody: postBody,
                postSlug: postSlug
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

    const postDataOnChange = (e) => { 
        setPostData({...postData, [e.target.id] : e.target.value})
        
        if(e.target.id == "post_title") generateSlug(e.target.value)
    }

    const generateSlug = (title) => {
        const postTitle = title;
        let escaped = postTitle.replace(/[^a-zA-Z0-9 ]/g, "")
        let slug = escaped.replaceAll(" ", "-")
        setPostSlug(slug.toLowerCase())
    }

    const onPostSlugChange = (e) => {
        setPostSlug(e.target.value)
    }

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
                                            <input onChange={postDataOnChange} type="text" className="form-control" id="post_title" placeholder="Title" value={postData.post_title}></input>
                                            <label id="options-label" >Options</label>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className="form-check">
                                                        <input 
                                                            onChange={e => setIsDraft(!isDraft)}
                                                            checked = {isDraft} 
                                                            className="form-check-input"
                                                            type="checkbox" 
                                                            id="post_is_draft">
                                                        </input>
                                                        <label className="form-check-label" htmlFor="post_is_draft">
                                                            Draft
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input 
                                                            onChange={e => setIsFeatured(!isFeatured)} 
                                                            className="form-check-input" 
                                                            checked={isFeatured} 
                                                            type="checkbox" 
                                                            id="post_is_featured">
                                                        </input>
                                                        <label className="form-check-label" htmlFor="post_is_featured">
                                                            Featured
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-3 order-md-2">
                                            <label htmlFor="post_tags_label">{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""} Slug (Friendly URL) </label>
                                            <input 
                                                className="form-control"
                                                readOnly={automaticSlug}
                                                value={postSlug}
                                                onChange={onPostSlugChange}
                                                type="text" 
                                                id="post_slug">
                                            </input>
                                            
                                            <div className="form-check">
                                                <input 
                                                    onChange={e => {generateSlug(postData.post_title);setAutomaticSlug(!automaticSlug)}}
                                                    checked = {automaticSlug}
                                                    className="form-check-input"
                                                    type="checkbox" 
                                                    id="automatic_slug">
                                                </input><label className="form-check-label" htmlFor="automatic_slug">Auto</label></div>
                                            </div>
                                        <div id="featured-image-section" className="form-group col-md-3 text-right order-1 order-md-3">
                                                <h5>Featured Image</h5>
                                           <div id="featured-image-wrapper">
                                                {postData.image ?  (
                                                    <Fragment>
                                                        <span onClick={deleteFeaturedImage} id="remove-featured-image"><FontawesomeIcon iconName="fas fa-times color-green" /></span>
                                                        <span onClick={changeFeaturedImage} id="replace-featured-image"><FontawesomeIcon iconName="fas fa-redo color-green" /></span>
                                                    </Fragment>
                                                ) : (
                                                    <span onClick={changeFeaturedImage}><FontawesomeIcon  iconName="fas fa-plus color-green" /></span>
                                                )}
                                                <img id="featured-image" src={`data:image/png;base64,${postData.image}`} alt=""/>
                                           </div>
                                            
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-3">
                                            <label htmlFor="post_lang_label">{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""} Language <CountryFlag country={postData.post_lang} size="24" /></label>
                                            <select defaultValue={postData.post_lang} onChange={postDataOnChange} className="form-control" id="post_lang">
                                                {POST_LANGS.split(',').map(lang => {
                                                    return <option key={lang} value={lang}>{lang}</option>
                                                })}
                                            </select>
                                            
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="post_tags_label">{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""} Category</label>
                                            <select  onChange={postDataOnChange} className="form-control" id="post_tags">
                                                {postCategories ? postCategories.map(cat => {
                                                    return <option selected={postData.post_tags === cat.tag ? true : false} key={cat.tag} value={cat.tag}>{cat.tag}</option>
                                                }) : ""}
                                            </select>
                                        </div>
                                       
                                        <div className="form-group col-md-3">
                                            <label htmlFor="post_tags_label">{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""} Meta description </label>
                                            <input 
                                                className="form-control"
                                                value={postData.post_meta}
                                                onChange={postDataOnChange}
                                                type="text" 
                                                id="post_meta">
                                            </input>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="post-body">{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""} Body</label>
                                            <Editor
                                                apiKey= {TINYMCE_API_KEY}
                                                initialValue={postBody}
                                                id="post_body"
                                                
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
                                            onEditorChange={setPostBody}
                                            />
                                        </div>
                                    </div>
                                    <div className="form row">
                                        <div className="form-group col-md-2">
                                            <button onClick={savePost} className="buttn badge-green">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isLoading ? <div className="loading-indicator">Loading <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /></div> : ""}
                </div>  );
    }else{
        return (<div className="postEditor">
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
 
export default EditPost;