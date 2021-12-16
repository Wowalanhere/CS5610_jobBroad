import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import reportWebVitals from './reportWebVitals';
import ResultPage from './pages/ResultPage';
import JobCreat from './pages/JobCreatePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FavouritePage from './pages/FavouritePage';
import EditPage from './pages/EditPage';

ReactDOM.render(
  <Router>
    {/* <Header/> */}
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/result_page" element={<ResultPage />} />
      <Route path="/login_page" element={<LoginPage />} />
      <Route path="/register_page" element={<RegisterPage />} />
      <Route path="/job_create_page" element={<JobCreat />} />
      <Route path="/detail_page" element={<DetailPage/>}/>
      <Route path="/edit_page" element={<EditPage/>}/>
      <Route exact path="/favourite_page/:username" element={<FavouritePage/>}/>
    </Routes>
  </Router>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();