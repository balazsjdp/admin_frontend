import React from 'react';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
// Import Config
import {BASIC_FUNCTIONS} from '../configuration/basic_functions'
import FontawesomeIcon from './FontawesomeIcon';



const {CallApi,compareValues} = BASIC_FUNCTIONS;






const PostManagement = () => {
    const [isLoading,setIsLoading] = useState(true);
    const [postList,setPostList] = useState([]);
    const [postCount,setPostCount] = useState(0);
    const [currentSort,setCurrentSort] = useState("asc")
    const [editing,setEditing] = useState({
        postId : 1,
        currentlyEditing : true
    })



    useEffect(() => {
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
    },[])

    const sortTable = (key) => {
        setPostList(postList.sort(compareValues(key,currentSort)))
        currentSort === "asc" ? setCurrentSort("desc") : setCurrentSort("asc")
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
                            <h3><span className="buttn badge-green"><FontawesomeIcon iconName="fas fa-pen" /> New</span></h3>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div id="post-list" className="widget-panel">
                        <div className="widget-panel-title">
                            Post Count
                        </div>
                        <div className="widget-body centered">
                            <h2>{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : postCount}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div id="post-list" className="widget-panel">
                        <div className="widget-panel-title">
                            Featured Post Count
                        </div>
                        <div className="widget-body centered">
                           <h2>{isLoading ? <FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /> : postList ? postList.filter(post => post.post_is_featured === "1").length : "?"}</h2>
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
                                        <th onClick={() => sortTable("post_timestamp")} className="mobile-hidden"><FontawesomeIcon iconName="fas fa-sort" paddingRight={true} /> Time</th>
                                        <th onClick={() => sortTable("post_lang")} className="mobile-hidden"><FontawesomeIcon iconName="fas fa-sort" paddingRight={true} /> Language</th>
                                        <th className="centered">Featured</th>
                                        <th onClick={() => sortTable("post_tags")} className="mobile-hidden"><FontawesomeIcon iconName="fas fa-sort" paddingRight={true} /> Tags</th>
                                        <th className="mobile-hidden">Draft</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {isLoading ? <tr><td><FontawesomeIcon iconName="fas fa-circle-notch fa-spin" /></td></tr> : postList.map(post => {
                                        return (
                                            <tr key={post.post_id}>
                                                <td>{post.post_title}</td>
                                                <td className="mobile-hidden">{post.post_timestamp}</td>
                                                <td className="mobile-hidden">{post.post_lang}</td>
                                                <td className="centered">{post.post_is_featured === "1" ? <FontawesomeIcon iconName="fas fa-star featured" /> : <FontawesomeIcon iconName="far fa-star featured" />}</td>
                                                <td className="mobile-hidden">{post.post_tags}</td>
                                                <td className="mobile-hidden">{post.post_is_draft === "1" ? "True" : "False"}</td>
                                                <td>
                                                    <Link to={`./editPost/${post.post_id}`}><span className="badge table-action badge-green"><FontawesomeIcon iconName="fas fa-pen" /></span></Link>
                                                    <span className="badge table-action badge-red"><FontawesomeIcon iconName="fas fa-trash-alt" /></span>
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
        </div>
     );
}
 
export default PostManagement;