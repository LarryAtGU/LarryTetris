import { Component, ChangeEvent } from "react";
import { Routes,Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from "react-bootstrap"

export default class Config extends Component {

  render() {

    return (
      <div >
          <h2>Configuration</h2>

        <div>
            Configuration staff will be put in this page
        </div>
      </div>
    );
  }
}
