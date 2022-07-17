import React from 'react';
import {useState} from 'react';


import { Routes,Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MainMenu from './components/mainmenu';
import TopScores from './components/topscore';
import Config from './components/config';
import Play from './components/play';
import Login from './components/login';

import './App.css';

let userId=0;
let isLogin=false;

export const setLogin = (uId:number)=> {
  userId=uId;
  isLogin=true;
  console.log("islogin: ",isLogin);
}


function App() {



  

  return (
    <div className="App">

      <nav className="navbar navbar-expand navbar-dark bg-dark">

        <div className="navbar-brand">
            LarryTetris
        </div>

        <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/mainmenu"} className="nav-link">
                Main Menu
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/topscores"} className="nav-link">
                Top Scores
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/config"} className="nav-link">
                Configuration
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/play"} className="nav-link text-light">
                <b>Play</b>
              </Link>
            </li>
          </div>


      </nav>
{
  isLogin?
  <Routes>
        <Route path="/mainmenu" element={<MainMenu />}> </Route>
        <Route path="/" element={<MainMenu />}> </Route>
        <Route path="/topscores" element={<TopScores />}> </Route>
        <Route path="/config" element={<Config />}> </Route>
        <Route path="/play" element={<Play />}> </Route>
    </Routes>
  :
  <Login />
}

    </div>
  );
}

export default App;
