import React from 'react';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
// Import Config
import {BASIC_FUNCTIONS} from '../configuration/basic_functions'
import FontawesomeIcon from './FontawesomeIcon';
import CountryFlag from './CountryFlag'


const {CallApi,compareValues,TopAlert} = BASIC_FUNCTIONS;

const ProductManagement = (props) => {
    const [isLoading,setIsLoading] = useState(true);
    const [productCount,setProductCount] = useState(0);
    const [currentSort,setCurrentSort] = useState("asc")
    const [productList,setProductList] = useState([]);


    useEffect(() => {
        getInitialData()
    },[])


    const getInitialData = () => {
        setIsLoading(true)
        CallApi({
            api : "api_frame.php?command=productList&lang=" + props.lang,
            method : "GET",
            data: null,
            onSuccess: (data) => {
                setProductList(data.message)
                setProductCount(data.message.length)
                setIsLoading(false)
            },
            onError: (err) => {
                setProductList([
                    {
                        post_id : null,
                        post_title: "No products yet",
                    }
                ])
                setProductCount(0)
                setIsLoading(false)
            }
        })
    }

    const sortTable = (key) => {
        setProductList(productList.sort(compareValues(key,currentSort)))
        currentSort === "asc" ? setCurrentSort("desc") : setCurrentSort("asc")
    }


    const newProduct = () => {
        CallApi({
            api : "api_frame.php",
            method : "POST",
            data: {
                command : 'newProduct',
                lang: props.lang
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

    const deleteProduct = (productId) => {
        CallApi({
            api : "api_frame.php",
            method : "POST",
            data: {
                command : 'deleteProduct',
                productId : productId
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
                <div className="col-12 col-md-6">
                    <div id="post-list" className="widget-panel">
                        <div className="widget-panel-title">
                            Product Actions
                        </div>
                        <div className="widget-body">
                            <h3 onClick={newProduct}><span className="buttn badge-green"><FontawesomeIcon iconName="fas fa-pen" /> New </span></h3>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div id="post-list" className="widget-panel">
                        <div className="widget-panel-title">
                            Products
                        </div>
                        <div className="widget-body centered">
                            <h2>{productCount}</h2>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row">
               <div className="col-12">
                    <div id="post-list" className="widget-panel">
                        <div className="widget-panel-title">
                            Product List
                        </div>
                        <div className="widget-body">
                            <table id="post-list-table" className="table">
                                <thead>
                                    <tr>
                                        <th onClick={() => sortTable("name")}><FontawesomeIcon iconName="fas fa-sort" paddingRight={true} /> Name</th>
                                        <th onClick={() => sortTable("category_name")}><FontawesomeIcon iconName="fas fa-sort" paddingRight={true} /> Category</th>
                                        <th>Country</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productList.map(product => {
                                            return(
                                                <tr key={product.id}>
                                                    <td>{product.name}</td>
                                                    <td>{product.category_name}</td>
                                                    <td><CountryFlag size="24" country={product.lang} /> </td>
                                                    <td>
                                                        <Link to={`./editProduct/${product.id}`}><span className="badge table-action badge-green"><FontawesomeIcon iconName="fas fa-pen" /> Edit</span></Link>
                                                        <span onClick={() =>deleteProduct(product.id)} className="badge table-action badge-red"><FontawesomeIcon iconName="fas fa-trash-alt" /> Delete</span>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
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
 
export default ProductManagement;