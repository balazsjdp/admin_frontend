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



const EditPost = (props) => {
    const [isLoading,setIsLoading] = useState(true);
    const [productData,setProductData] = useState();
    const [productCategories, setProductCategories] = useState()
    const {productId} = useParams()
    const [postSlug,setPostSlug] = useState()
    const [automaticSlug,setAutomaticSlug] = useState(true)

    const [description,setDescription] = useState()
    const [howToUse,setHowToUse] = useState()
    const [ingredients,setIngredients] = useState()
    const [otherInfo,setOtherInfo] = useState()

    useEffect(() => {
        getInitialData()
    },[])

    

    const getInitialData = () => {
        CallApi({
            api : "api_frame.php?command=productData&productId=" + productId,
            method : "GET",
            data: null,
            onSuccess: (data) => {
                console.log(data)
                setIsLoading(false)
                setProductData(data.message[0])
                setDescription(data.message[0].description)
                setHowToUse(data.message[0].how_to_use)
                setIngredients(data.message[0].ingredients)
                setOtherInfo(data.message[0].other_information)
                setPostSlug(data.message[0].slug)
            },
            onError: (err) => {
                setIsLoading(false)
            }
        })
        CallApi({
            api : "api_frame.php?command=productCategories&lang=" + props.lang,
            method : "GET",
            data: null,
            onSuccess: (data) => {
                setIsLoading(false)
                setProductCategories(data.message)
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
                        command: 'removeFeaturedImageProduct',
                        productId: productId
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
                formData.append('command','featuredImageUploadProduct')
                formData.append('productId', productId)
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
        //delete postData.post_featured_image;
        CallApi({
            api : "api_frame.php",
            method : "POST",
            data: {
                command: 'saveProduct',
                //productData: productData,
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

    const productDataOnChange = (e) => { 
        setProductData({...productData, [e.target.id] : e.target.value})
        
        if(e.target.id == "name") generateSlug(e.target.value)
    }

    const generateSlug = (title) => {
        const productTitle = title;
        let endReplaced = productTitle.replace('&','and')
        let escaped = endReplaced.replace(/[^a-zA-Z0-9 ]/g, "")
        let slug = escaped.replaceAll(" ", "-")
        setPostSlug(slug.toLowerCase())
    }

    const onPostSlugChange = (e) => {
        setPostSlug(e.target.value)
    }

    if(productData){
        return (<div className="postEditor">
                    <div className="container-fluid">
                        <div className="row title-wrapper">
                            <div className="col-md-12">
                                <PageTitle type={BASIC_CONFIG.PAGES_TITLE_TAG} text={isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : productData.name} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <div id="post-data">
                                    <div className="form-row">
                                        <div className="form-group col-md-6 order-2 order-md-1">
                                            <label htmlFor="post-title">{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""} Title</label>
                                            <input onChange={productDataOnChange} type="text" className="form-control" id="name" placeholder="Title" value={productData.name}></input>
                                            
                                            <div className="row mt-4">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="lang">{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""} Language <CountryFlag country={productData.lang} size="24" /></label>
                                                    <select defaultValue={productData.lang} onChange={productDataOnChange} className="form-control" id="lang">
                                                        {POST_LANGS.split(',').map(lang => {
                                                            return <option key={lang} value={lang}>{lang}</option>
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="category">{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""} Category</label>
                                                    <select  onChange={productDataOnChange} className="form-control" id="category">
                                                        {productCategories ? productCategories.map(cat => {
                                                            return <option selected={productData.category === cat[`category_name_${props.lang}`] ? true : false} key={cat.id} value={cat.id}>{cat[`category_name_${props.lang}`]}</option>
                                                        }) : ""}
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label htmlFor="post_tags_label">{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""} Meta description </label>
                                                    <input 
                                                        className="form-control"
                                                        value={productData.meta_desc}
                                                        onChange={productDataOnChange}
                                                        type="text" 
                                                        id="meta_desc">
                                                    </input>
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
                                                id="slug">
                                            </input>
                                            <div className="form-check">
                                                <input 
                                                    onChange={e => {generateSlug(productData.name);setAutomaticSlug(!automaticSlug)}}
                                                    checked = {automaticSlug}
                                                    className="form-check-input"
                                                    type="checkbox" 
                                                    id="automatic_slug">
                                                </input><label className="form-check-label" htmlFor="automatic_slug">Auto</label></div>
                                            </div>
                                            
                                        <div id="featured-image-section" className="form-group col-md-3 text-right order-1 order-md-3">
                                            <h5>Featured Image</h5>
                                           <div id="featured-image-wrapper">
                                                {productData.image ?  (
                                                    <Fragment>
                                                        <span onClick={deleteFeaturedImage} id="remove-featured-image"><FontawesomeIcon iconName="fas fa-times color-green" /></span>
                                                        <span onClick={changeFeaturedImage} id="replace-featured-image"><FontawesomeIcon iconName="fas fa-redo color-green" /></span>
                                                    </Fragment>
                                                ) : (
                                                    <span onClick={changeFeaturedImage}><FontawesomeIcon  iconName="fas fa-plus color-green" /></span>
                                                )}
                                                <img id="featured-image" src={`data:image/png;base64,${productData.image}`} alt=""/>
                                           </div>
                                        </div>
                                    </div>
                                    <div className="form-row mt-3">
                                        <div className="form-group col-md-3">
                                            <label htmlFor="post-body">{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""} Description</label>
                                            <Editor
                                                apiKey= {TINYMCE_API_KEY}
                                                initialValue={description}
                                                id="description"
                                                
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
                                            onEditorChange={setDescription}
                                            />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="post-body">{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""} How To Use</label>
                                            <Editor
                                                apiKey= {TINYMCE_API_KEY}
                                                initialValue={howToUse}
                                                id="how_to_use"
                                                
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
                                            onEditorChange={setHowToUse}
                                            />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="post-body">{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""} Ingredients</label>
                                            <Editor
                                                apiKey= {TINYMCE_API_KEY}
                                                initialValue={ingredients}
                                                id="ingredients"
                                                
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
                                            onEditorChange={setIngredients}
                                            />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="post-body">{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : ""} Other Information</label>
                                            <Editor
                                                apiKey= {TINYMCE_API_KEY}
                                                initialValue={otherInfo}
                                                id="other_info"
                                                
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
                                            onEditorChange={setOtherInfo}
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