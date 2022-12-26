import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

const UserForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {setNotification} = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [user,setUser] = useState({
        id:null,
        name:"",
        email:"",
        password:"",
        password_confirmation:"",
    });



    if(id){
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/users/${id}`)
                .then(({data}) => {
                    setUser(data);
                    setLoading(false);
                }).catch(() => {
                    setLoading(false);
                })
        },[])
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(user.id){
            axiosClient.put(`/users/${user.id}`,user)
                .then(() => {
                    setNotification("User updated successfully");
                    navigate("/users");
                }).catch(err => {
                const response = err.response;
                if(response && response.status === 422){
                    console.log(response.data.errors)
                    setErrors(response.data.errors)
                }
            })
        }else{
            axiosClient.post("/users",user)
                .then(() => {
                    setNotification("User created successfully");
                    navigate("/users");
                }).catch(err => {
                const response = err.response;
                if(response && response.status === 422){
                    console.log(response.data.errors)
                    setErrors(response.data.errors)
                }
            })
        }

    }

  return (
    <>
        {user.id && <h1>Update User : {user.name}</h1>}
        {!user.id && <h1>Add New User</h1>}
        <div className="card animated fadeInDown">
            {loading && <div className="card-body">Loading...</div>}
            {errors && <div className="alert">
                {Object.keys(errors).map((key) => (
                      <p key={key}>{errors[key][0]}</p>
                    ))}
            </div>
            }
            {!loading && <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="form-group" >
                        <label htmlFor="name">Name</label>
                        <input type="text" onChange={e => setUser({...user,name:e.target.value})} className="form-control" id="name" placeholder="Enter name" value={user.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" onChange={e => setUser({...user,email:e.target.value})} className="form-control" id="email" placeholder="Enter email" value={user.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={e => setUser({...user,password:e.target.value})} className="form-control" id="password" placeholder="Password"  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password_confirmation">Password Confirmation</label>
                        <input type="password" onChange={e => setUser({...user,password_confirmation:e.target.value})} className="form-control" id="password_confirmation" placeholder="Password Confirmation"  />
                    </div>
                    <button type="submit"  className="btn btn-primary">Save</button>

                </form>
            </div>}
        </div>
    </>
  );
};

export default UserForm;
