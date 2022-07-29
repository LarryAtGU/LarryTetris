import { Component } from 'react';
import { Shape } from './shapes';
import { getUserID } from './login';

import Canvas from '../Canvas/canvas';
import { clearCanvas, drawBox, showCanvas } from '../Canvas/canvas';
import { ScoreDataService } from '../services/services';

import {
  getFieldHeight,
  getFieldWidth,
  getGameLevel,
  getMusic,
  getSound,
  setMusic,
  setSound,
  getExtend,
} from './config';

import 'bootstrap/dist/css/bootstrap.min.css';

const soundfile = 'http://localhost:3000/mixkit-arcade-game-complete-or-approved-mission-205.wav';
const musicfile = 'http://localhost:3000/soft-pad-2018-03-27-korgm3-67676.mp3';
const soundfile2 = 'http://localhost:3000/mixkit-extra-bonus-in-a-video-game-2045.wav';

const audio1 = new Audio(soundfile);
const audio2 = new Audio(soundfile2);

const music = new Audio(musicfile);

music.loop = true;

const boxSize = 20;
let fieldWidth = 10;
let fieldHeight = 15;
let canvasWidth = (fieldWidth + 2 + 5) * boxSize; // first 2 are the U shape, anther 5 for new shape
let canvasHeight = (fieldHeight + 1) * boxSize;

const initPage = (w: number, h: number) => {
  fieldWidth = w;
  fieldHeight = h;
  canvasWidth = (fieldWidth + 2 + 5) * boxSize; // first 2 are the U shape, anther 5 for new shape
  canvasHeight = (fieldHeight + 1) * boxSize;
};

const boardColor = 'gray';

let boardMap: number[][];

let offsetY = 0; //
let sppedY = 1;
let myShape = null as unknown as Shape;
let myScore = 0;
let gameOver = false;
let myMessage = 'Click the Start to play the game...';
let hintShapeType = -1; // no hint shape
let hintShape = null as unknown as Shape;

let hasSound = false;
let hasMusic = false;
let hasExtend = false;

const initGame = () => {
  //    if(gameInitalized) return;
  var col, row;
  boardMap = new Array<number[]>();
  for (col = 0; col < fieldWidth; ++col) {
    boardMap[col] = new Array<number>();
    for (row = 0; row < fieldHeight; ++row) {
      boardMap[col][row] = -1;
    }
  }

  myShape = null as unknown as Shape;
  hintShapeType = -1; // no hint shape
  hintShape = null as unknown as Shape;
  myScore = 0;
  gameOver = false;
  myMessage = 'Enjoy the game....';
  sppedY = getGameLevel();
  hasSound = getSound();
  hasMusic = getMusic();
  hasExtend = getExtend();
};

const getHintShape = () => {
  let shapetypes = 7;
  if (hasExtend) shapetypes = 10;
  if (hintShapeType < 0) {
    hintShapeType = Math.floor(Math.random() * shapetypes);
  }
  const ret = hintShapeType;
  hintShapeType = Math.floor(Math.random() * shapetypes);
  hintShape = new Shape(hintShapeType);
  hintShape.mx = fieldWidth + 3;
  hintShape.my = 3;
  return ret;
};

const drawHintShape = () => {
  if (hintShape === null) return;
  drawShape(hintShape, false);
};
const createMyShape = () => {
  if (gameOver) return;
  if (checkGameOver()) return;
  myShape = new Shape(getHintShape());
  myShape.mx = Math.floor(fieldWidth / 2);
};

const trySetGameScore = (id: number, score: number) => {
  const service = new ScoreDataService();
  service
    .setTopScore(id, score)
    .then((response: any) => {
      const rank = parseInt(response.data.rank);
      if (rank > 0) {
        myMessage = 'Congratulation, you are ranked ' + rank + ' in top 10.';
      }
    })
    .catch((e: Error) => {
      console.log(e);
    });
};
const checkGameOver = () => {
  const cx = Math.floor(fieldWidth / 2);

  if (boardMap[cx][0] !== -1) {
    gameOver = true;
    myMessage = 'Game Over....';
    trySetGameScore(getUserID(), myScore);
  }
  return gameOver;
};

const checkFullRow = (): number[] => {
  const ret = [] as number[];
  const addScore = [100, 300, 600, 1000];
  const sortMsg = ['Good job', 'So nice...', 'Wow, you made it...', 'You are a genius'];
  var i = 0;
  var j = 0;
  var isFullLine = false;
  for (i = 0; i < fieldHeight; ++i) {
    isFullLine = true; // assume full line
    for (j = 0; j < fieldWidth; ++j) {
      if (boardMap[j][i] === -1) {
        isFullLine = false;
        break;
      }
    }
    if (isFullLine) {
      ret.push(i);
    }
  }
  if (ret.length > 0) {
    myScore += addScore[ret.length - 1];
    myMessage = sortMsg[ret.length - 1];
    if (hasSound) audio1.play();
  }

  return ret;
};

const drawPosPox = (x: number, y: number, c: string, hasOffset: boolean) => {
  const cx = (x + 1) * boxSize; // plus one for the edge.
  var cy = y * boxSize;
  if (hasOffset) cy = cy + offsetY - boxSize;
  drawBox(cx, cy, boxSize, boxSize, c);
};

const drawShape = (sp: Shape, moving = true) => {
  const shapeX = sp.mx;
  const shapeY = sp.my;
  const blockNum = sp.getBlockNum();
  const col = sp.getColor();
  let i = 0;
  let pos = { x: 0, y: 0 };
  for (i = 0; i < blockNum; ++i) {
    pos = sp.getBlockPos(i);
    drawPosPox(pos.x + shapeX, pos.y + shapeY, col, moving);
  }
};

const drawBoardBlocks = () => {
  var col, row;
  for (col = 0; col < fieldWidth; ++col) {
    for (row = 0; row < fieldHeight; ++row) {
      if (boardMap[col][row] < 0) continue;
      drawPosPox(col, row, myShape.getTypeColor(boardMap[col][row]), false);
    }
  }
};

const canShapeMove = (dir: number): boolean => {
  var poses;
  switch (dir) {
    case 0: // move down
      poses = myShape.getMoveDownPoses();
      break;
    case 1: // move left
      poses = myShape.getMoveLeftPoses();
      break;
    case 2: // move right
      poses = myShape.getMoveRightPoses();
      break;
    default: // turn
      poses = myShape.getTurnPoses();
      break;
  }

  if (poses?.find((p) => !testPosValid(p.x, p.y))) return false;
  return true;
};

const removeFullLines = (fullLines: number[]) => {
  const len = fullLines.length;
  var row, r, c;
  for (let i = 0; i < len; ++i) {
    row = fullLines[i];
    for (r = row; r > 0; --r) {
      for (c = 0; c < fieldWidth; ++c) {
        boardMap[c][r] = boardMap[c][r - 1];
      }
    }
  }
  for (r = len; r >= 0; --r) {
    for (c = 0; c < fieldWidth; ++c) boardMap[c][r] = -1;
  }
};

const settleShape = () => {
  const num = myShape.getBlockNum();
  var i = 0;
  for (i = 0; i < num; ++i) {
    const { x, y } = myShape.getBlockPos(i);
    boardMap[myShape.mx + x][myShape.my + y] = myShape.type;
  }

  const fullLines = checkFullRow();
  if (fullLines.length > 0) {
    if (hasSound) audio2.play();
    removeFullLines(fullLines);
  }
  createMyShape();
};
const moveShape = () => {
  if (myShape == null) createMyShape();

  const addVal = 1 + (sppedY - 1) * 0.5;

  offsetY += addVal;
  if (offsetY >= boxSize) {
    offsetY = 0;
    if (!canShapeMove(0)) {
      // down
      settleShape();
    } else {
      myShape.my++;
    }
  }
};

const testPosValid = (x: number, y: number): boolean => {
  if (x < 0) return false;
  if (x >= fieldWidth) return false;
  if (y < 0) return false;
  if (y >= fieldHeight) return false;
  if (boardMap[x][y] !== -1) return false;
  return true;
};
const moveLeft = () => {
  if (canShapeMove(1)) {
    myShape.mx--;
    offsetY = Math.max(boxSize - 2, offsetY); // make it down quicker
    if (hasSound) audio1.play();
  }
};

const moveRight = () => {
  if (canShapeMove(2)) {
    myShape.mx++;
    offsetY = Math.max(boxSize - 2, offsetY); // make it down quicker

    if (hasSound) audio1.play();
  }
};

const moveDown = () => {
  offsetY = Math.max(boxSize - 2, offsetY); // make it down quicker
  if (canShapeMove(0)) {
    myShape.my++;
    if (hasSound) audio1.play();
  }
};

const turnShape = () => {
  if (canShapeMove(3)) {
    myShape.turnClockWise();
    if (hasSound) audio1.play();
  }
};

const drawBoard = () => {
  drawBox(0, 0, boxSize, canvasHeight, boardColor);
  drawBox(0, canvasHeight - boxSize, canvasWidth - 5 * boxSize, boxSize, boardColor);
  drawBox(canvasWidth - 6 * boxSize, 0, boxSize, canvasHeight, boardColor);
};

const showBox = () => {
  //    initGame();
  clearCanvas();
  drawBoard();
  drawHintShape();
  moveShape();
  drawShape(myShape);
  drawBoardBlocks();

  showCanvas();
};

type GameState = {
  isRunning: boolean;
  gameScore: number;
  gameMessage: string;
  canvasWidth: number;
  canvasHeight: number;
};

type GameProp = {
  title: string;
};

const myKeyPress = (key: string) => {
  switch (key) {
    case 'ArrowLeft':
      moveLeft();
      break;
    case 'ArrowRight':
      moveRight();
      break;
    case 'ArrowUp':
      turnShape();
      break;
    case 'ArrowDown':
      moveDown();
      break;
    case 's':
    case 'S':
      hasSound = !hasSound;
      setSound(hasSound);
      break;
    case 'm':
    case 'Mmmmss':
      hasMusic = !hasMusic;
      setMusic(hasMusic);

      if (hasMusic) {
        music.play();
      } else {
        music.pause();
      }
      setMusic(hasMusic)
      break;
  }
};
export default class Play extends Component<GameProp, GameState> {
  heartBeat = () => {
    this.setState((state) => ({ ...state, gameScore: myScore, gameMessage: myMessage }));
    if (!this.state.isRunning) return;
    if (gameOver) return;
    showBox();
  };

  startRunning = () => {
    if (gameOver) {
      gameOver = false;
      initGame();
      this.setState((s) => ({ ...s, isRunning: true }));
      return;
    }
    this.setState((s) => ({ ...s, isRunning: s.isRunning ? false : true }));
  };

  constructor(prop: GameProp) {
    super(prop);
    const w = getFieldWidth();
    const h = getFieldHeight();
    initPage(w, h);
    initGame();

    console.log('w, h, ', w, h);
    this.state = {
      isRunning: false,
      gameScore: 0,
      gameMessage: 'Enjoy the game...',
      canvasHeight: canvasHeight,
      canvasWidth: canvasWidth,
    };
  }
  interval: NodeJS.Timer | undefined;

  componentDidMount(): void {
    if (hasMusic) music.play();
    this.interval = setInterval(this.heartBeat, 50);
  }
  componentWillUnmount() {
    music.pause();
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <h2>{this.state.gameMessage}</h2>

        <div>
          <button type="button" onClick={this.startRunning}>
            {gameOver ? 'Start a new game' : this.state.isRunning ? 'Pause' : 'Start'}
          </button>
          <button type="button" onClick={moveLeft}>
            {'<-'}
          </button>
          <button type="button" onClick={turnShape}>
            Turn
          </button>
          <button type="button" onClick={moveRight}>
            {'->'}
          </button>
          <button type="button" onClick={moveDown}>
            Down
          </button>
          <div>
            <div>
              <p></p>
              <div className="bg-light border w-25 container">
                Level: {sppedY} Sound Effect: {hasSound ? 'on' : 'off'} Music: {hasMusic ? 'on' : 'off'}
              </div>
              <p></p>
              <div className="badge bg-primary ">Score: {this.state.gameScore}</div>
              <div className="badge bg-dark ">{hasExtend ? 'Extend mode' : ''}</div>
              <p></p>
            </div>
            <Canvas height={this.state.canvasHeight} width={this.state.canvasWidth} keyHandle={myKeyPress} />
          </div>
        </div>
      </div>
    );
  }
}
