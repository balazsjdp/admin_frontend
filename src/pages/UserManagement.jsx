import React from 'react';
import { Link } from 'react-router-dom';
// Import Config
import {BASIC_CONFIG} from '../configuration/basic_config'
import {COUNTRY_LIST} from '../configuration/country_list'
import {BASIC_FUNCTIONS} from '../configuration/basic_functions'
// Import Components
import PageTitle from '../components/PageTitle'
import PostManagement from '../components/PostManagement'
import FontawesomeIcon from '../components/FontawesomeIcon'

// Import styles
import '../scss/pages/usermanagement.scss'
import { useState } from 'react';
import { useEffect } from 'react';

const {CallApi,compareValues,TopAlert} = BASIC_FUNCTIONS;

const UserManagement = () => {
    const [isLoading,setIsLoading] = useState(false);
    const [userList,setUserList] = useState();
    const [currentSort,setCurrentSort] = useState("asc")



    useEffect(() => {
        getInitialData()
    },[])



    function getInitialData(){
        CallApi({
            api : "api_frame.php?command=userList",
            method : "GET",
            data: null,
            onSuccess: (data) => {
                setUserList(data.message)
                console.log(data.message)
                setIsLoading(false)
            },
            onError: (err) => {
                TopAlert.fire({
                    icon: 'error',
                    title: "Error fetching users. For more info see console."
                })
                setIsLoading(false)
            }
        })
    }

    const sortTable = (key) => {
        setUserList(userList.sort(compareValues(key,currentSort)))
        currentSort === "asc" ? setCurrentSort("desc") : setCurrentSort("asc")
    }

    return ( <div className="posts">
        <div className="container-fluid">
            <div className="row title-wrapper">
                <div className="col-md-12">
                    <PageTitle type={BASIC_CONFIG.PAGES_TITLE_TAG} text="User Management" />
                </div>
            </div>
           
            <div className="row mt-3">
                <div id="widget-container" className="col-md-12">
                  <div className="row">
                   <div className="col-md-3">
                        <div id="user-actions" className="widget-panel">
                                <div className="widget-panel-title">
                                    Actions
                                </div>
                                <div className="widget-body">
                                    <h3><span className="buttn badge-green"><FontawesomeIcon iconName="fas fa-user-plus" /> New User</span></h3>
                                </div>
                        </div>
                   </div>
                  </div>
                  <div className="row">
                      <div className="col-md-12">
                        <div id="user-list" className="widget-panel">
                            <div className="widget-panel-title">
                                User List
                            </div>
                            <div className="widget-body">
                               <table id="users-table" className="table">
                                   <thead>
                                       <tr>
                                           <th className="mobile-hidden ">Profile Picture</th>
                                           <th onClick={() => sortTable("user_first_name")}><FontawesomeIcon iconName="fas fa-sort" paddingRight={true} />First Name</th>
                                           <th onClick={() => sortTable("user_last_name")}><FontawesomeIcon iconName="fas fa-sort" paddingRight={true} />Last Name</th>
                                           <th onClick={() => sortTable("user_email")}><FontawesomeIcon iconName="fas fa-sort" paddingRight={true} />Email</th>
                                           <th onClick={() => sortTable("user_title")}><FontawesomeIcon iconName="fas fa-sort" paddingRight={true} />Title</th>
                                           <th onClick={() => sortTable("user_country")}><FontawesomeIcon iconName="fas fa-sort" paddingRight={true} />Country</th>
                                           <th onClick={() => sortTable("access_level")}><FontawesomeIcon iconName="fas fa-sort" paddingRight={true} />Access Level</th>
                                           <th></th>
                                       </tr>
                                   </thead>
                                   <tbody>
                                        {userList ? userList.map((user) => {
                                           return (
                                           <tr>
                                               <td className="mobile-hidden "><img class="user-thumb" src={`data:image/png;base64,${user.profile_pic}`} alt=""/></td>
                                               <td>{user.user_first_name}</td>
                                               <td>{user.user_last_name}</td>
                                               <td>{user.user_email}</td>
                                               <td>{user.user_title}</td>
                                               <td>{user.user_country}</td>
                                               <td>{user.access_level}</td>
                                               <td>
                                                   <Link to={`./editUser/${user.user_id}`}><span className="badge table-action badge-green"><FontawesomeIcon iconName="fas fa-pen" /></span></Link>
                                                 <span onClick={() =>console.log("asd")} className="badge table-action badge-red"><FontawesomeIcon iconName="fas fa-trash-alt" /></span>
                                                 </td>
                                           </tr>);
                                       }) : null}
                                   </tbody>
                               </table>
                            </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
        </div>
       
    </div> );
}
 
export default UserManagement;