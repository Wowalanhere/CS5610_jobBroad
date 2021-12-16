import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import MyHeader from "../other_comp/Header";
import './ResultPage.css';


export default function ResultPage(props) {

    const location = useLocation()
    const passContent = location.state.content;
    //the params past with navigation
    const [searchContent, setsearchContent] = useState(passContent)
    const [searchResult, setSearchResult] = useState([])
    const navigate = useNavigate();

    function searchOnce() {
        axios.get('/api/jobs/blur/' + passContent)
            .then(response => {
                console.log(response.data);
                setSearchResult(response.data);
            })
            .catch(error => console.log(error))
    }
    useEffect(searchOnce, []);

    const jobs = [];
    for (let job of searchResult) {
        jobs.push(<div className="contentBox" onClick={() => {
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

    return (
        <div>
            <MyHeader />
            <div id="resultWholecontainer">
                <div>
                    <button id="resultSearchButton" onClick={() => {
                        axios.get('/api/jobs/blur/' + searchContent)
                            .then(response => {
                                console.log(response.data);
                                setSearchResult(response.data);
                            })
                            .catch(error => console.log(error))
                    }}>
                        Search
                    </button>
                    <input placeholder="eg: software" id="resultSearchInput" type="text" defaultValue={passContent}
                        onChange={(e) => {
                            setsearchContent(e.target.value);
                        }} />
                </div>
                <div>{jobs}</div>
            </div>
        </div>

    )

}