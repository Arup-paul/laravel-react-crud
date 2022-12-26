import React, {useEffect, useState} from 'react';
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import Pagination from "react-js-pagination";
const Users = () => {
    const [users,setUsers] = useState([]);
    const [loading,setLoading] = useState(false);
    const {setNotification} = useStateContext();

    useEffect(() => {
         getUsers()
    },[])
    const onDelete = (user) => {
        if(!window.confirm(`Are you sure you want to delete ${user.name}?`)){
            return false;
        }
        axiosClient.delete(`/users/${user.id}`)
            .then(() => {
                setNotification('User deleted successfully')
                getUsers()
            })
    }
    const getUsers = (pageNumber = 1) => {
        setLoading(true)
        axiosClient.get(`/users?page=${pageNumber}`)
            .then(({data}) => {
                setLoading(false)
                setUsers(data)

                console.log(data)

            }).catch(() => {
               setLoading(false)
         })
    }





    return (
        <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h1>Users</h1>
                <Link to="/users/create" className="btn-add" >Add New</Link>
            </div>

            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                    {loading &&
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading..
                            </td>
                        </tr>

                    }
                    {!loading  && users?.data?.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.created_at}</td>
                            <td>
                                <Link to={`/users/${user.id}`} className="btn-edit">Edit</Link>

                                <button onClick={e => onDelete(user)}  className="btn-delete">Delete</button>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>

                    <Pagination
                        activePage={users?.meta?.current_page ? users?.meta?.current_page : 0}
                        itemsCountPerPage={users?.meta?.per_page ?users?.meta?.per_page : 0 }
                        totalItemsCount={users?.meta?.total ? users?.meta?.total : 0}
                        onChange={(pageNumber) => {
                            getUsers(pageNumber)
                        }}
                        pageRangeDisplayed={8}
                        itemClass="page-item"
                        linkClass="page-link"
                        firstPageText="First Page"
                        lastPageText="Last Lage"
                    />

            </div>
        </div>
    );
};

export default Users;
