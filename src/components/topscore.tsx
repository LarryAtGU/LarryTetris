import { Component, useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from "react-bootstrap"
import GenPdf from "./genpdf"
import { ScoreDataService } from "../services/services";

export type score ={
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


const Score : React.FC<Pros2> = ({sc}) => {
  return (
    <tr key={sc.rank}>
      <td>{sc.rank}</td>
      <td>{sc.name}</td>
      <td>{sc.score}</td>
    </tr>
  )

}         
const ScoreList:React.FC<Pros>= ({scores}) => {
  const[topScores, setTopScores]=useState(scores)
  const[topScoreLoaded,setTopScoreLoaded]=useState(false);
  useEffect(()=>{

    const service=new ScoreDataService();
    if(!topScoreLoaded)
    service.getScores()
    .then((response: any) => {
        setTopScores(response.data)
        setTopScoreLoaded(true);
    })
    .catch((e: Error) => {
        console.log(e);
    });


  });

  const getTopScoresStr = () => {
    return topScores.map((u)=>({name: u.name, score: ""+u.score}))
  }

  return (
    <div className="w-25 p-3 container">
      <table className="table">
      <tbody>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
        {topScores.map((sc)=>
          <Score sc={sc}></Score>)}
      </tbody>
      </table>
      <div>
        <GenPdf sts={getTopScoresStr()}></GenPdf> 
      </div>
    </div>
  )
}

export default class TopScores extends Component {
  render() {

    return (
      <div >
          <h2>Top Scores</h2>
        <ScoreList scores={[]}></ScoreList>


      </div>
    );
  }
}
