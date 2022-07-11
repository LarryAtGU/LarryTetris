import { Component, ChangeEvent } from "react";
import { Routes,Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from "react-bootstrap"

export default class MainMenu extends Component {

  render() {

    return (
      <div >

        <ul>
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
              <Link to={"/play"} className="nav-link text-dark">
                <b>Play</b>
              </Link>
            </li>
        </ul>

      </div>
    );
  }
}
