import React from 'react';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
// Import Config
import {BASIC_FUNCTIONS} from '../configuration/basic_functions'
import FontawesomeIcon from './FontawesomeIcon';
import CountryFlag from './CountryFlag'


const {CallApi,compareValues,TopAlert} = BASIC_FUNCTIONS;

const PostManagement = () => {
    const [isLoading,setIsLoading] = useState(true);
    const [postList,setPostList] = useState([]);
    const [postCount,setPostCount] = useState(0);
    const [currentSort,setCurrentSort] = useState("asc")


    useEffect(() => {
        getInitialData()
    },[])


    const getInitialData = () => {
        setIsLoading(true)
        CallApi({
            api : "api_frame.php?command=posts",
            method : "GET",
            data: null,
            onSuccess: (data) => {
                setPostList(data.message)
                setPostCount(data.message.length)
                setIsLoading(false)
            },
            onError: (err) => {
                setPostList([
                    {
                        post_id: "Error",
                        post_is_draft: "Error",
                        post_is_featured: "Error",
                        post_lang: "Error",
                        post_tags: "Error",
                        post_timestamp: "Error",
                        post_title: "Error",
                    }
                ])
                setPostCount("Error")
                setIsLoading(false)
            }
        })
    }

    const sortTable = (key) => {
        setPostList(postList.sort(compareValues(key,currentSort)))
        currentSort === "asc" ? setCurrentSort("desc") : setCurrentSort("asc")
    }

    const setFeatured = (postId,nextState) => {
        CallApi({
            api : "api_frame.php",
            method : "POST",
            data: {
                command : 'toggleFeatured',
                postId : postId,
                featured: nextState
            },
            onSuccess: (data) => {
                getInitialData()
                TopAlert.fire({
                    icon: 'success',
                    title: data.message
                })
            },
            onError: (err) => {
                TopAlert.fire({
                    icon: 'error',
                    title: "Editing post failed. See console for more info!"
                })
            }
        })
    }

    const newPost = () => {
        CallApi({
            api : "api_frame.php",
            method : "POST",
            data: {
                command : 'newPost',
            },
            onSuccess: (data) => {
                getInitialData()
                TopAlert.fire({
                    icon: 'success',
                    title: data.message
                })
            },
            onError: (err) => {
                TopAlert.fire({
                    icon: 'error',
                    title: "Error creating posts. Check console for more info!"
                })
            }
        })
    }

    const deletePost = (postId) => {
        CallApi({
            api : "api_frame.php",
            method : "POST",
            data: {
                command : 'deletePost',
                postId : postId
            },
            onSuccess: (data) => {
                getInitialData()
                TopAlert.fire({
                    icon: 'success',
                    title: data.message
                })
            },
            onError: (err) => {
                TopAlert.fire({
                    icon: 'error',
                    title: "Error deleting post. Check console for more info!"
                })
            }
        })
    }


    return ( 
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-4">
                    <div id="post-list" className="widget-panel">
                        <div className="widget-panel-title">
                            Post Actions
                        </div>
                        <div className="widget-body">
                            <h3 onClick={newPost}><span className="buttn badge-green"><FontawesomeIcon iconName="fas fa-pen" /> New</span></h3>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div id="post-list" className="widget-panel">
                        <div className="widget-panel-title">
                            Post Count
                        </div>
                        <div className="widget-body centered">
                            <h2>{postCount}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div id="post-list" className="widget-panel">
                        <div className="widget-panel-title">
                            Featured Post Count
                        </div>
                        <div className="widget-body centered">
                           <h2>{postList ? postList.filter(post => post.post_is_featured === "1").length : "?"}</h2>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row">
               <div className="col-12">
                    <div id="post-list" className="widget-panel">
                        <div className="widget-panel-title">
                            Post List
                        </div>
                        <div className="widget-body">
                            <table id="post-list-table" className="table">
                                <thead>
                                    <tr>
                                        <th onClick={() => sortTable("post_title")}><FontawesomeIcon iconName="fas fa-sort" paddingRight={true} /> Title</th>
                                        <th onClick={() => sortTable("post_timestamp")} className="mobile-hidden"><FontawesomeIcon iconName="fas fa-sort" paddingRight={true} /> Created</th>
                                        <th onClick={() => sortTable("post_lang")} className="mobile-hidden text-center"><FontawesomeIcon iconName="fas fa-sort" paddingRight={true} /> Language</th>
                                        <th className="centered">Featured</th>
                                        <th onClick={() => sortTable("post_tags")} className="mobile-hidden"><FontawesomeIcon iconName="fas fa-sort" paddingRight={true} /> Tags</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {postList.map(post => {
                                        let isDraft = post.post_is_draft === "1" ? " - Draft" : ""
                                        return (
                                            <tr key={post.post_id}>
                                                <td>{`${post.post_title}`}<b className="is-draft">{isDraft}</b></td>
                                                <td className="mobile-hidden">{post.post_timestamp}</td>
                                                <td className="mobile-hidden text-center"><CountryFlag size="24" country={post.post_lang} />  </td>
                                                <td onClick={() => setFeatured(post.post_id,post.post_is_featured === "1" ? "0" : "1")} className="centered">{post.post_is_featured === "1" ? <FontawesomeIcon iconName="fas fa-star featured" /> : <FontawesomeIcon iconName="far fa-star featured" />}</td>
                                                <td className="mobile-hidden">{post.post_tags}</td>
                                                <td>
                                                    <Link to={`./editPost/${post.post_id}`}><span className="badge table-action badge-green"><FontawesomeIcon iconName="fas fa-pen" /></span></Link>
                                                    <span onClick={() =>deletePost(post.post_id)} className="badge table-action badge-red"><FontawesomeIcon iconName="fas fa-trash-alt" /></span>
                                                </td>
                                            </tr>
                                        )
                                    })} 
                                </tbody>
                            </table>
                        </div>
                    </div>
               </div>
            </div>
            {isLoading ? <div className="loading-indicator">Loading <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /></div> : ""}
        </div>
        
     );
}
 
export default PostManagement;