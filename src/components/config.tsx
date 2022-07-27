import { Component, ChangeEvent } from "react";
import { Routes,Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from "react-bootstrap"

export type GameConfig ={
  width:number,
  height:number,
  sound:boolean,
  music:boolean,
  extend:boolean,
  AI:boolean,
  level:number
}

const gameConfig:GameConfig ={
  width:10,
  height:15,
  sound:true,
  music:true,
  extend:false,
  AI:false,
  level:1,

}

export const getFieldWidth = () => {
  return gameConfig.width;
}

export const getFieldHeight = () => {
  return gameConfig.height;
}
export const getGameLevel = () => {
  return gameConfig.level;
}

type ConfigProp ={

}
export default class Config extends Component <ConfigProp, GameConfig> {

  changeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    var val =Math.min(15, Math.max(5,parseInt(e.target.value)));
    this.setState({
      ...this.state, width:val
    })
    gameConfig.width=val;

  }


  changeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    var val =Math.min(25, Math.max(10,parseInt(e.target.value)));
    this.setState({
      ...this.state, height:val
    })
    gameConfig.height=val;

  }


  changeLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    var val =Math.min(9, Math.max(1,parseInt(e.target.value)));
    this.setState({
      ...this.state, level:val
    })
    gameConfig.level=val;

  }


  constructor(prop:ConfigProp) {
    super(prop)
    this.state=gameConfig;
  }
  render() {

    return (
      <div >
          <h2>Configuration</h2>

        <div>

        <div className="container w-25">
        <ul className="list-group">
        <li className="list-group-item" key="width">
          Field Width:  <input
                type="number"
                placeholder="Field Width"
                value={this.state.width}
                onChange={this.changeWidth}
                name="width"
                />

        </li>

        <li className="list-group-item" key="height">
          Field Height:  <input
                type="number"
                placeholder="Field Height"
                value={this.state.height}
                onChange={this.changeHeight}
                name="height"
                />

        </li>

        <li className="list-group-item" key="level">
          Field Height:  <input
                type="number"
                placeholder="Game Level"
                value={this.state.height}
                onChange={this.changeLevel}
                name="height"
                />

        </li>

        </ul>
    </div>

        </div>
      </div>
    );
  }
}
