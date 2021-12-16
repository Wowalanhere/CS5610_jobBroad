import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyHeader from "../other_comp/Header";
import './FavouritePage.css';



export default function FavouritePage(props) {

    const { username } = useParams();
    // const [jobIds, setJobIds] = useState([]);
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);

    function searchJobs(jobIds) {
        for (let id of jobIds) {
            let jobid = id.jobid;
            axios.get('/api/jobs/id/' + jobid)
                .then(response => {
                    console.log(response.data[0]);
                    setJobs(jobs => [
                        ...jobs,
                        response.data[0],
                    ])
                })
                .catch(error => console.log(error))
        }
    }

    function searchJobIds() {
        const result = axios.get('/api/favourites/username/' + username)
            .then(response => {
                searchJobs(response.data);
            })
            .catch(error => console.log(error))
    }

    useEffect(searchJobIds, []);

    const favourites = [];
    for (let job of jobs) {
        favourites.push(<div className="contentBox" onClick={() => {
            navigate('/detail_page', {
                state: {
                    id: job.id,
                }
            });
        }}>
            <div className="smallerContentBox">
                <div className="title">
                    Job Title:
                </div>
                <div className="content">
                    {job.title}
                </div>
            </div>
            <div className="smallerContentBox">
                <div className="title">
                    Company:
                </div>
                <div className="content">
                    {job.companyname}
                </div>
            </div>
            <div className="smallerContentBox">
                <div className="title">
                    Location:
                </div>
                <div className="content">
                    {job.location}
                </div>
            </div>
        </div>)
    }

    // jobComponent.push(<div onClick={() => {
    //     navigate('/detail_page', {state:{
    //         id: response.data[0].jobid,
    //     }});
    // }}>
    //     <div>
    //         Job Title: {response.data[0].title}
    //     </div>
    //     <div>
    //         Company: {response.data[0].companyname}
    //     </div>
    //     <div>
    //         Location: {response.data[0].location}
    //     </div>
    // </div>
    // );

    return (

        <div>
            <MyHeader />
            <div id="favouriteWholecontainer">
                <h3 id="favouriteHint">
                    Here is your favourites
                </h3>
                <div>
                    {favourites}
                </div>
            </div>
        </div>
    )

}