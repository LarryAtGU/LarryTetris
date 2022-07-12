import { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from "react-bootstrap"

type score ={
  rank:number;
  name:string;
  score:number;
}

type Pros={
  scores:score[];
}
type Pros2={
  sc:score;
}
var topScores=[{rank:1,name:"Blue Fish",score:8000},
          {rank:2,name:"Mier",score:7000},
          {rank:3,name:"Little Bee",score:6000}];


const Score : React.FC<Pros2> = ({sc}) => {
  return (
    <tr>
      <td>{sc.rank}</td>
      <td>{sc.name}</td>
      <td>{sc.score}</td>

    </tr>
  )

}         
const ScoreList:React.FC<Pros>= ({scores}) => {
  return (
    <div className="w-25 p-3 container">
      <table className="table">
        <tr>
        <th>Rank</th>
        <th>Name</th>
        <th>Score</th>
        </tr>
        {scores.map((sc)=>
          <Score sc={sc}></Score>)}

      </table>
    </div>
  )
}

export default class TopScores extends Component {

  render() {

    return (
      <div >
          <h2>Top Scores</h2>
        <ScoreList scores={topScores}></ScoreList>


      </div>
    );
  }
}
