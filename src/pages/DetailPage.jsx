import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import MyHeader from "../other_comp/Header";
import './DetailPage.css';


export default function DetailPage(props) {
    const location = useLocation();
    const passContent = location.state.id;
    const [searchResult, setSearchResult] = useState({})
    const [ifFavourite, setIfFavourite] = useState(false);
    const navigate = useNavigate();
    const [favourite, setFavourite] = useState({
        username: '',
        jobid: passContent,
    })

    function searchOnce() {
        axios.get('/api/jobs/id/' + passContent)
            .then(response => {
                console.log(response.data[0]);
                setSearchResult(response.data[0]);
            })
            .catch(error => console.log(error))
    }
    useEffect(searchOnce, []);

    const [loginName, setLoginName] = useState('');

    function checkLoginName() {
        axios.get('/api/users/whoisloggedin')
            .then(response => {
                setLoginName(response.data);
                setFavourite({
                    ...favourite,
                    username: response.data,
                })
            })
            .catch(error => setLoginName(''))
    }
    useEffect(checkLoginName, []);

    function checkFavourite() {
        axios.get('/api/favourites/jobanduser/' + loginName + '/' + passContent)
            .then(response => {
                console.log(response.data[0].username);
                if (response.data[0].username === loginName) {
                    setIfFavourite(true)
                } else {
                    setIfFavourite(false)
                }
            })
            .catch(error => console.log(error))
    }
    useEffect(checkFavourite);




    return (
        <div>
            <MyHeader />
            <div id="detailWholecontainer">
                <div id="contentBox">
                    <div className="title">Job Title: </div>
                    <div className="content">{searchResult.title}</div>
                </div>
                <div id="contentBox">
                    <div className="title">Job Company: </div>
                    <div className="content">{searchResult.companyname}</div>
                </div>
                <div id="contentBox">
                    <div className="title">Job Location: </div>
                    <div className="content">{searchResult.location}</div>
                </div>
                <div id="contentBox">
                    <div className="title">Job Description: </div>
                    <div id="description">{searchResult.description}</div>
                </div>

                {searchResult.website ? (<div id="contentBox">
                    <div className="title">Job Web: </div>
                    <div id="webAndEmail">{searchResult.website}</div>
                </div>) : null}

                <div id="contentBox">
                    <div className="title">Job Contact Email: </div>
                    <div id="webAndEmail">{searchResult.email}</div>
                </div>

                <div id="contentBox">
                    <div className="title">Post Date: </div>
                    <div className="content">{searchResult.postdate}</div>
                </div>

                {(!ifFavourite) ?
                    (<button id="favouriteButton" onClick={() => {
                        if (loginName.length) {
                            axios.post('/api/favourites/create', favourite)
                                .then(response => setIfFavourite(true))
                                .catch(error => console.log(error))
                        } else {
                            navigate('/login_page');
                        }
                    }}>Favourite</button>)
                    :
                    (<button id="favouriteButton" onClick={() => {
                        axios.delete('/api/favourites/remove/' + loginName + '/' + passContent)
                            .then(response => setIfFavourite(false))
                            .catch(error => console.log(error))
                    }}>Unfavourite</button>)}

                {(loginName === searchResult.poster) ? (<div>
                    <button id="editButton" onClick={() => {
                        navigate('/edit_page', {
                            state: {
                                jobid: passContent,
                                username: favourite.username,
                            }
                        });
                    }}>
                        Edit
                    </button>
                    <button id="deleteButton" onClick={() => {
                        axios.delete('/api/jobs/deleteid/' + passContent)
                            .then(response => {
                                alert("Delete Successfully!");
                                navigate('/');
                            })
                            .catch(error => console.log(error))
                    }}>
                        Delete
                    </button>
                </div>) : null}
            </div>

        </div>
    )



}