import { Component, ChangeEvent } from "react";
import { Routes,Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from "react-bootstrap"

export default class TopScores extends Component {

  render() {

    return (
      <div >
          <h2>Top Scores</h2>

          <Table>
          <tr>
            <th>#</th> <th>Name</th><th>Score</th>

          </tr>
            <tr>
              <td>1</td><td>Uncle Blue Fish</td> <td>8000</td>
            </tr>
            <tr>
              <td>2</td><td>Mier</td> <td>7000</td>
            </tr>
            <tr>
              <td>3</td><td>Little Bee</td> <td>6000</td>
            </tr>
          </Table>
      </div>
    );
  }
}
