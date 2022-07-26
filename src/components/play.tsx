import { Component, ChangeEvent, KeyboardEventHandler } from "react";
import { Shape } from "./shapes";
import { getUserID } from "./login";

import React from 'react';
import Canvas from "../Canvas/canvas";
import {clearCanvas, drawBox, showCanvas} from '../Canvas/canvas';
import {ScoreDataService} from '../services/services'

import "bootstrap/dist/css/bootstrap.min.css";

  const boxSize = 20;
  const fieldWidth=10;
  const fieldHeight=15;
  const canvasWidth=(fieldWidth+2)*boxSize
  const canvasHeight=(fieldHeight+1)*boxSize;
  const boardColor="gray"

  var firstLoadPage=true;

  var boardMap:number[][];
  
  let offsetY=0; //
  let sppedY=1;
  let gameInitalized=false;
  let myShape = null as unknown as Shape;
  let myScore=0;
  let gameOver=false;
  let myMessage="Click the Start to play the game..."

  const initGame=()=>{
    if(gameInitalized) return;
    var col,row;
    boardMap=new Array<number[]>();
    for(col=0;col<fieldWidth;++col) {
      boardMap[col]=new Array<number>();
      for(row=0;row<fieldHeight;++row){
        boardMap[col][row]=-1;
      }
    }
    gameInitalized=true;
    myScore=0;
    gameOver=false;
    myMessage="Enjoy the game...."
  }

  const createMyShape=()=>{
    if(gameOver)return;
    if(checkGameOver()) return;
    myShape=new Shape(Math.floor(Math.random()*7));
    myShape.mx=Math.floor(fieldWidth/2);
  }

  const trySetGameScore=(id:number,score:number) => {
    const service=new ScoreDataService();
    service.setTopScore(id,score)
    .then((response: any) => {
        console.log(response.data);
        const rank=parseInt(response.data.rank);
        if(rank>0) {
            myMessage="Congratulation, you are ranked "+rank+" in top 10."
        }
    })
    .catch((e: Error) => {
        console.log(e);
    });

  }
  const checkGameOver=()=>{
    const cx=Math.floor(fieldWidth/2);
    
    if(boardMap[cx][0]!==-1){
      gameOver=true;
      myMessage="Game Over....";
      trySetGameScore(getUserID(),myScore);
    }
    return gameOver;
  }

  const checkFullRow = () :number[]=>{
    const ret=[] as number[];
    const addScore=[100,300,600,1000];
    const sortMsg=['Good job','So nice...','Wow, you made it...','You are a genius'];
    var i=0;
    var j=0;
    var isFullLine=false;
    for(i=0;i<fieldHeight;++i) {
      isFullLine=true; // assume full line
      for(j=0;j<fieldWidth;++j) {
        if(boardMap[j][i]===-1) {
          isFullLine=false; 
          break;
        }
      }
      if(isFullLine) {
        ret.push(i);
      }
    }
    if(ret.length>0) {
      myScore+=addScore[ret.length-1];
      myMessage=sortMsg[ret.length-1];

    }

    return ret;

  }

  const drawPosPox = (x:number,y:number,c:string,hasOffset:boolean) =>{
    const cx=(x+1)*boxSize;// plus one for the edge.
    var cy=y*boxSize;
    if(hasOffset) cy=cy+offsetY-boxSize;
    drawBox(cx,cy,boxSize,boxSize,c);
  }

  const drawShape = (sp:Shape) => {
    const shapeX=sp.mx;
    const shapeY=sp.my;
    const blockNum=sp.getBlockNum();
    const col=sp.getColor();
    let i=0;
    let pos={x:0,y:0};
    for(i=0;i<blockNum;++i){
      pos=sp.getBlockPos(i);
      drawPosPox(pos.x+shapeX,pos.y+shapeY,col,true);
    }
  }


  const drawBoardBlocks = () => {
    var col,row;
    for(col=0;col<fieldWidth;++col) {
      for(row=0;row<fieldHeight;++row) {
        if(boardMap[col][row]<0) continue;
        drawPosPox(col,row,myShape.getTypeColor(boardMap[col][row]),false);
      }
    }
  }

  const canShapeMove = (dir:number):boolean => {
    var poses;
    switch(dir) {
      case 0: // move down
        poses=myShape.getMoveDownPoses();
        break;
      case 1: // move left
        poses=myShape.getMoveLeftPoses();
        break;
      case 2: // move right
        poses=myShape.getMoveRightPoses();
        break;
      default: // turn
        poses=myShape.getTurnPoses();
        break;
    }

    
    if(poses?.find((p)=>(!testPosValid(p.x,p.y)))) return false;
    return true;
  }

  const removeFullLines = (fullLines:number[]) =>{
    const len=fullLines.length;
    var row,r,c;
    for(let i=0;i<len;++i) {
      row=fullLines[i];
      for(r=row;r>0;--r) {
        for(c=0;c<fieldWidth;++c) {
          boardMap[c][r]=boardMap[c][r-1];
        }
      }      
    }
    for(r=len;r>=0;--r) {
      for(c=0;c<fieldWidth;++c)
        boardMap[c][r]=-1;
    }
  } 

  const settleShape=()=>{

    const num=myShape.getBlockNum();
    var i=0;
    for(i=0;i<num;++i) {
      const {x,y}=myShape.getBlockPos(i);
      boardMap[myShape.mx+x][myShape.my+y]=myShape.type;
    }

    const fullLines=checkFullRow();
    if(fullLines.length>0) {
      removeFullLines(fullLines);
    }
    createMyShape();
  }
  const moveShape = ()=> {
    if(myShape==null) createMyShape();

    offsetY+=sppedY;
    if(offsetY>=boxSize) {
      offsetY=0;
      if(!canShapeMove(0)) { // down
        settleShape();
      } else {
        myShape.my++;
      }
    }
  
  }

  const testPosValid = (x:number, y:number) : boolean =>
  {
    if(x<0)return false;
    if(x>=fieldWidth)return false;
    if(y<0) return false;
    if(y>=fieldHeight) return false;
    if(boardMap[x][y]!==-1) return false;
    return true;
  }
  const moveLeft =( ) => {
    if(canShapeMove(1)) myShape.mx--;
  }

  const moveRight =( ) => {
    if(canShapeMove(2)) myShape.mx++;
  }

  const moveDown =() => {
    if(canShapeMove(0)) myShape.my++;
  }

  const turnShape = ()=>{
    if(canShapeMove(3)) myShape.turnClockWise();
  }

  const drawBoard = () => {
    drawBox(0,0,boxSize,canvasHeight,boardColor);
    drawBox(0,canvasHeight-boxSize,canvasWidth,boxSize,boardColor);
    drawBox(canvasWidth-boxSize,0,boxSize,canvasHeight,boardColor);

  }

  const showBox = () => {
    initGame();
    clearCanvas()
    drawBoard();
    moveShape();
    drawShape(myShape);
    drawBoardBlocks();

    showCanvas();
  }


type GameState ={
  count:number;
  mx:number;
  isRunning:boolean;
  gameScore:number;
  gameMessage:string;
}

type GameProp={
  title:string;
}

export default class Play extends Component <GameProp,GameState> {
  heartBeat = () => {
    this.setState((state)=>({...state,
      count: state.count+1,
      gameScore:myScore,
      gameMessage:myMessage,
    }));
    if(!this.state.isRunning) return;
    if(gameOver)return;
    showBox();
  }

  startRunning =()=>{
    if(gameOver) {
      gameOver=false;
      gameInitalized=false;
      initGame();
      this.setState((s)=>(
        {...s,
          isRunning:true,
        }
      ))
      return;
  
    }
    this.setState((s)=>(
      {...s,
        isRunning: s.isRunning?false:true,
      }
    ))
  }


  constructor(prop:GameProp) {
    super(prop);
    this.state = {
      count: 0,
      mx:0,
      isRunning:false,
      gameScore:0,
      gameMessage:"Enjoy the game...",
    };
    if(firstLoadPage) {
      setInterval(this.heartBeat, 40);
      firstLoadPage=false;

    }
  }  

  render() {

    return (
      <div >
          <h2>{this.state.gameMessage}</h2>

        <div>
            <button type="button" onClick={this.startRunning}>
              {gameOver?"Start a new game":this.state.isRunning?"Pause":"Start"}</button>
            <button type="button" onClick={moveLeft}>{"<-"}</button>
            <button type="button" onClick={turnShape}>Turn</button>
            <button type="button" onClick={moveRight}>{"->"}</button>
            <button type="button" onClick={moveDown}>Down</button>
            <div >
              <div>
                <p>Score: {this.state.gameScore}</p>
              </div>
            <Canvas height={canvasHeight} width={canvasWidth} />
            </div>


        </div>
      </div>
    );
  }
}
