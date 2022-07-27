import React from 'react';

import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login';

import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-brand">LarryTetris</div>

        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={'/mainmenu'} className="nav-link">
              Main Menu
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'/topscores'} className="nav-link">
              Top Scores
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'/config'} className="nav-link">
              Configuration
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'/play'} className="nav-link text-light">
              <b>Play</b>
            </Link>
          </li>
        </div>
      </nav>

      <Login />
    </div>
  );
}

export default App;
