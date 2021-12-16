import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyHeader from "../other_comp/Header";
import './JobCreatPage.css'

export default function JobCreat() {
    const [loginName, setLoginName] = useState('');
    const [ifEmpty, setIfEmpty] = useState(true);
    const [jobForm, setJobForm] = useState({
        title: '',
        companyname: '',
        location: '',
        description: '',
        email: '',
        website: '',
        poster: '',
    })
    const [jobTitle, setJobTitle] = useState('');
    const navigate = useNavigate();

    function checkLoginName() {
        axios.get('/api/users/whoisloggedin')
            .then(response => {
                setLoginName(response.data);
            })
            .catch(error => console.log(error));
    }
    useEffect(checkLoginName);




    // function checkEmpty() {
    //     if(jobForm.title.length&&jobForm.companyname.length&&jobForm.location.length
    //         &&jobForm.description.length&&jobForm.email.length){
    //             setIfEmpty(false);
    //         }else {
    //             setIfEmpty(true);
    //         }
    // }

    return (
        <div>
            <MyHeader />
            <div id="creatWholecontainer">
                <h3 id="creatHint">
                    Please Input the Job Infomation
                </h3>
                <h5 className="title">
                    Job Title:
                </h5>
                <input id="creatInput"
                    onChange={(e) => {
                        const title = e.target.value;
                        const poster = loginName;
                        setJobForm({
                            ...jobForm,
                            title: title,
                            poster: poster,
                        })
                    }} />
                <h5 className="title">
                    Campany Name:
                </h5>
                <input type="text" id="creatInput"
                    onChange={(e) => {
                        const companyname = e.target.value;
                        setJobForm({
                            ...jobForm,
                            companyname: companyname,
                        })
                    }} />
                <h5 className="title">
                    Location:
                </h5>
                <input type="text" id="creatInput"
                    onChange={(e) => {
                        const location = e.target.value;
                        setJobForm({
                            ...jobForm,
                            location: location,
                        })
                    }} />
                <h5 className="title">
                    Job Description:
                </h5>
                <input type="text" id="creatInput"
                    onChange={(e) => {
                        const description = e.target.value;
                        setJobForm({
                            ...jobForm,
                            description: description,
                        })
                    }} />
                <h5 className="title">
                    Contact Email:
                </h5>
                <input type="text" id="creatInput"
                    onChange={(e) => {
                        const email = e.target.value;
                        setJobForm({
                            ...jobForm,
                            email: email,
                        })
                    }} />
                <h5 className="title">
                    Website:
                </h5>
                <input type="text" id="creatInput"
                    onChange={(e) => {
                        const website = e.target.value;
                        setJobForm({
                            ...jobForm,
                            website: website,
                        });
                    }} />
                <button id="submitButton"
                    onClick={
                        () => {
                            if (!(jobForm.title.length && jobForm.companyname.length && jobForm.location.length
                                && jobForm.description.length && jobForm.email.length)) {
                                alert("Except Website, you must fill other blanks!");
                            } else {
                                axios.post('/api/jobs/create', jobForm)
                                    .then(response => {
                                        setJobTitle(response.data);
                                        navigate('/');
                                        alert("Successfully Creat a Job");
                                    })
                                    .catch(error => console.log(error))
                            }

                        }}>
                    Submit!
                </button>
            </div>

        </div>
    )
}