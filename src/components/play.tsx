import { Component, ChangeEvent } from "react";
import { Routes,Route, Link } from "react-router-dom";

import React from 'react';
import Canvas from "../Canvas/canvas";
import {clearCanvas, drawBox} from '../Canvas/canvas';



import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from "react-bootstrap"

type prop={
    x:number
  }
  
  let myX=0
  

  const showBox = () => {
    clearCanvas()
    drawBox(myX, 100,10,10,'red');
    if(myX>400) {
      myX=0
    }
    else {
      myX=myX+3
    }
  
  }

  const ani =()=>{
    clearCanvas()
    console.log("here")
    setInterval(showBox, 10)
  }


export default class Play extends Component {


  render() {

    return (
      <div >
          <h2>Configuration</h2>

        <div>
            <button type="button" onClick={ani}>click me</button>
            <div>
            <Canvas height={200} width={400} />
            </div>


        </div>
      </div>
    );
  }
}
