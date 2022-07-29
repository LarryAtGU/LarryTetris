import { Component, ChangeEvent } from 'react';
import { Input, Slider, Switch, Checkbox } from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import { config } from 'process';

export type GameConfig = {
  width: number;
  height: number;
  sound: boolean;
  music: boolean;
  extend: boolean;
  AI: boolean;
  level: number;
};

const gameConfig: GameConfig = {
  width: 10,
  height: 15,
  sound: true,
  music: true,
  extend: false,
  AI: false,
  level: 1,
};

export const getFieldWidth = () => {
  return gameConfig.width;
};

export const getFieldHeight = () => {
  return gameConfig.height;
};
export const getGameLevel = () => {
  return gameConfig.level;
};
export const getSound = () => {
  return gameConfig.sound;
};

export const setSound = (b: boolean) => {
  gameConfig.sound = b;
};

export const getMusic = () => {
  return gameConfig.music;
};

export const setMusic = (b: boolean) => {
  gameConfig.music = b;
};

export const getExtend = () => gameConfig.extend;
export const getAI = () => gameConfig.AI;

type ConfigProp = {};
export default class Config extends Component<ConfigProp, GameConfig> {
  changeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    var val = Math.min(15, Math.max(5, parseInt(e.target.value)));
    this.setState({
      ...this.state,
      width: val,
    });
    gameConfig.width = val;
  };

  changeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    var val = Math.min(25, Math.max(10, parseInt(e.target.value)));
    this.setState({
      ...this.state,
      height: val,
    });
    gameConfig.height = val;
  };

  changeLevel = (_: Event, value: number | number[]) => {
    const val = Array.isArray(value) ? value[0] : value;
    //    val += gameConfig.level;
    this.setState({
      ...this.state,
      level: val,
    });
    gameConfig.level = val;
  };
  changeSound = () => {
    gameConfig.sound = !gameConfig.sound;
  };

  changeMusic = () => {
    gameConfig.music = !gameConfig.music;
  };

  changeExtend = () => {
    gameConfig.extend = !gameConfig.extend;
  };

  changeAI = () => {
    gameConfig.AI = !gameConfig.AI;
  };

  constructor(prop: ConfigProp) {
    super(prop);
    this.state = gameConfig;
  }
  render() {
    return (
      <div>
        <h2>Configuration</h2>

        <div>
          <div className="container w-25">
            <ul className="list-group">
              <li className="list-group-item" key="width">
                Field Width:{' '}
                <input
                  type="number"
                  placeholder="Field Width"
                  value={this.state.width}
                  onChange={this.changeWidth}
                  name="width"
                />
              </li>

              <li className="list-group-item" key="height">
                Field Height:{' '}
                <input
                  type="number"
                  placeholder="Field Height"
                  value={this.state.height}
                  onChange={this.changeHeight}
                  name="height"
                />
              </li>

              <li className="list-group-item" key="level">
                Game Level:{' '}
                <Slider
                  aria-label="Level"
                  placeholder="Game Level"
                  value={this.state.level}
                  valueLabelDisplay="auto"
                  marks
                  step={1}
                  min={1}
                  max={9}
                  onChange={this.changeLevel}
                  name="level"
                />
              </li>
              <li className="list-group-item" key="sound">
                Has sound effects:
                {this.state.sound ? (
                  <Switch defaultChecked onChange={this.changeSound} />
                ) : (
                  <Switch onChange={this.changeSound} />
                )}
              </li>
              <li className="list-group-item" key="music">
                Music on:
                {this.state.music ? (
                  <Switch defaultChecked onChange={this.changeMusic} />
                ) : (
                  <Switch onChange={this.changeMusic} />
                )}
              </li>

              <li className="list-group-item" key="extend">
                Extend mode:
                {this.state.extend ? (
                  <Switch defaultChecked onChange={this.changeExtend} />
                ) : (
                  <Switch onChange={this.changeExtend} />
                )}
              </li>
              <li className="list-group-item" key="ai">
                AI play:
                {this.state.AI ? (
                  <Switch defaultChecked onChange={this.changeAI} />
                ) : (
                  <Switch onChange={this.changeAI} />
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
