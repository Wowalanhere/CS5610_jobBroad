import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './JobCreatPage.css';
import MyHeader from "../other_comp/Header";

export default function EditPage() {

    const location = useLocation();
    const username = location.state.username;
    const jobid = location.state.jobid;
    const navigate = useNavigate();

    const [jobForm, setJobForm] = useState({
        title: '',
        companyname: '',
        location: '',
        description: '',
        email: '',
        website: '',
        poster: username,
    })

    function setDefaultInfo() {
        axios.get('/api/jobs/id/' + jobid)
            .then(response => {
                const info = response.data[0];
                setJobForm({
                    ...jobForm,
                    title: info.title,
                    companyname: info.companyname,
                    location: info.location,
                    description: info.description,
                    email: info.email,
                    website: info.website,
                })
            })
            .catch(error => console.log(error))
    }

    useEffect(setDefaultInfo, []);




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
                <input id="creatInput" defaultValue={jobForm.title}
                    onChange={(e) => {
                        const title = e.target.value;
                        setJobForm({
                            ...jobForm,
                            title: title,
                        })
                    }} />
                <h5 className="title">
                    Campany Name:
                </h5>
                <input id="creatInput" type="text" defaultValue={jobForm.companyname}
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
                <input id="creatInput" type="text" defaultValue={jobForm.location}
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
                <input id="creatInput" type="text" defaultValue={jobForm.description}
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
                <input id="creatInput" type="text" defaultValue={jobForm.email}
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
                <input id="creatInput" type="text" defaultValue={jobForm.website}
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
                                axios.post('/api/jobs/update/' + jobid, jobForm)
                                    .then(response => {
                                        navigate('/');
                                        alert("Successfully Edit a Job");
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