import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyHeader from "../other_comp/Header";
import './HomePage.css'


export default function HomePage() {

    const [searchContent, setsearchContent] = useState('')
    const navigate = useNavigate();

    return (
        <div>
            <MyHeader />
            <div id="homeWholecontainer">
                <h3 id="homeHint">Please input job title you want to search</h3>
                <div>
                    <button id="homeSearchButton" onClick={() => {
                        navigate('/result_page', {
                            state: {
                                content: searchContent,
                            }
                        });
                    }}>
                        Search
                    </button>
                    <input placeholder="eg: software" id="homeSearchInput" type="text" value={searchContent}
                        onChange={(e) => {
                            setsearchContent(e.target.value);
                        }} />
                </div>
            </div>
        </div>
    )

} 