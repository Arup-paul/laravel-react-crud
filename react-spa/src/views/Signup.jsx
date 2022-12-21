import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

const Signup = () => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [errors,setErrors] = useState(null)

    const {setUser,setToken} = useStateContext();



    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
            password_confirmation:confirmPasswordRef.current.value,
        }

        axiosClient.post('/signup',payload)
            .then(({data}) => {
                console.log(data)
                 setUser(data.user)
                 setToken(data.token)
            }).catch(err => {
                const response = err.response;
                if(response && response.status === 422){
                    console.log(response.data.errors)
                    setErrors(response.data.errors)
                }
        })

    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Create a new  account</h1>
                    {
                        errors && <div className="alert">
                            {Object.keys(errors).map(key => (
                                 <p key={key}>{errors[key][0]}</p>
                          ))}
                        </div>
                    }
                    <input ref={nameRef} type="text" placeholder="Full Name"/>
                    <input ref={emailRef} type="email" placeholder="Email"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <input ref={confirmPasswordRef} type="password" placeholder="Password Confirmation"/>
                    <button className="btn btn-block">Signup</button>
                    <p className="message">
                        Already Registered ? <Link to="/login">Log In</Link>
                    </p>
                </form>
            </div>
        </div>

    );
};

export default Signup;
