import React, { useEffect, useState } from "react";
import './Header.css';
import { Link } from "react-router-dom";
import axios from "axios";

export default function MyHeader() {

    const [loginName, setLoginName] = useState('');

    function checkLoginName() {
        axios.get('/api/users/whoisloggedin')
            .then(response => setLoginName(response.data))
            .catch(error => setLoginName(''))
    }
    useEffect(checkLoginName);
    // use this useEffect, when there is a logged in user, loginnname will be set
    // when there is no user, the loginname will be null


    return (
        <div className="fixedheader">
            <div>
                <div id="logo">JOB BROAD</div>
            </div>
            <div id="name">
                <p class="logopw">By Anlan Xu</p>
            </div>
            <div className="headdivide">
                <div id="linkPattern">
                    <Link to={"/"}>HOME PAGE</Link>
                </div>
            </div>
            {loginName.length ? (<div className="headdivide">
                <div id="linkPattern">
                    <Link to={"/job_create_page"}>CREAT JOB</Link>
                </div>
                <div id="linkPattern">
                    <Link to={"/favourite_page/" + loginName}>FAVOURITE</Link>
                </div>
                <div id="linkPattern">
                    <Link to={"/"} onClick={() => {
                        axios.post('api/users/logout')
                            .then(response => console.log(response))
                            .catch(error => console.log(error))
                    }}>LOGOUT</Link>
                </div>
                <div>
                    <div color="white">Hello, {loginName}</div>
                </div>
            </div>) : (
                <div className="headdivide">
                    <div id="linkPattern">
                        <Link to={"/login_page"}>LOG IN</Link>
                    </div>
                    <div id="linkPattern">
                        <Link to={"/register_page"}>SIGN UP</Link>
                    </div>

                </div>

            )}


        </div>
    )
}