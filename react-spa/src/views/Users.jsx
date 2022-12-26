import React, {useEffect, useState} from 'react';
import axiosClient from "../axios-client.js";

const Users = () => {
    const [users,setUsers] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
         getUsers()
    },[])

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
            .then(({data}) => {
                setLoading(false)
                console.log(data)
            }).catch(() => {
               setLoading(false)
         })
    }

    return (
        <div>
            users
        </div>
    );
};

export default Users;
