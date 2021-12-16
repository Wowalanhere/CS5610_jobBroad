import axios from "axios";
import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router";
import MyHeader from "../other_comp/Header";
import './RegisterPage.css';


export default function RegisterPage() {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        username: '',
        password: '',
    })

    const [passwordVli, setPasswordVli] = useState('');

    function creatUser(userData) {
        axios.post('/api/users/', userData)
            .then(response => {
                console.log(response);
                navigate('/');
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <div>
            <MyHeader />
            <div id="registerWholecontainer">
                <h3 id="registerHint">
                    Sign Up
                </h3>
                <h5 className="title">
                    Username:
                </h5>
                <input id="registerInput" type="text" value={userData.username}
                    onChange={(e) => {
                        const username = e.target.value;
                        setUserData({
                            ...userData,
                            username: username,
                        })
                    }} />

                <h5 className="title">
                    Password:
                </h5>
                <input id="registerInput" type="password" value={userData.password}
                    onChange={(e) => {
                        const password = e.target.value;
                        setUserData({
                            ...userData,
                            password: password,
                        })
                    }} />

                <h5 className="title">
                    Please input password again:
                </h5>
                <input id="registerInput" type="password"
                    onChange={(e) => {
                        const password = e.target.value;
                        setPasswordVli(password);
                    }} />


                <button id="registerButton"
                    onClick={() => {

                        if (passwordVli === userData.password) {
                            {
                                axios.post('/api/users/authenticate', userData)
                                    .then(response => {
                                        alert("We already have the username!")
                                    })
                                    .catch(error => {
                                        creatUser(userData);
                                        navigate('/');
                                    });
                            }
                        } else {
                            alert("Password not match!")
                        }
                    }
                    }>
                    Sign Up
                </button>
            </div>
        </div>
    )

}