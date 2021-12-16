import axios from "axios";
import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router";
import MyHeader from "../other_comp/Header";
import './RegisterPage.css';


export default function LoginPage() {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        username: '',
        password: '',
    })

    return (
        <div>
            <MyHeader />
            <div id="registerWholecontainer">
                <h3 id="registerHint">
                    Login
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

                <button id="registerButton"
                    onClick={() => {
                        axios.post('/api/users/authenticate', userData)
                            .then(response => {
                                console.log(response);
                                navigate('/');
                            })
                            .catch(error => {
                                console.log(error);
                                alert("Please input correct username and password!")
                            });
                    }}>
                    Login
                </button>
            </div>

        </div>
    )

}