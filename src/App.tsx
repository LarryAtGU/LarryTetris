import React, { createContext } from 'react';
import { useContext } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login';
import AuthContext from './components/auth';
import MainMenu from './components/mainmenu';
import Config from './components/config';
import TopScores from './components/topscore';
import Play from './components/play';
import './App.css';

function App() {
  const ctx = useContext(AuthContext);
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-brand">LTetris</div>
        {!!ctx.id && (
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
            <li className="nav-item">
              <button className="btn" onClick={ctx.onLogout}>
                Logout
              </button>
            </li>
          </div>
        )}
      </nav>

      {!!ctx.id && (
        <div>
          <Routes>
            <Route path="/mainmenu" element={<MainMenu />}>
              {' '}
            </Route>
            <Route path="/" element={<MainMenu />}>
              {' '}
            </Route>
            <Route path="/topscores" element={<TopScores />}>
              {' '}
            </Route>
            <Route path="/config" element={<Config />}>
              {' '}
            </Route>
            <Route path="/play" element={<Play uid={ctx.id} />}>
              {' '}
            </Route>
          </Routes>
        </div>
      )}

      {!ctx.id && <Login />}
    </div>
  );
}

export default App;
