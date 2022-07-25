import { Component, ChangeEvent, KeyboardEventHandler } from "react";
import { Shape } from "./shapes";

import React from 'react';
import Canvas from "../Canvas/canvas";
import {clearCanvas, drawBox, showCanvas} from '../Canvas/canvas';

import "bootstrap/dist/css/bootstrap.min.css";
import { BlobOptions } from "buffer";

  const boxSize = 20;
  const fieldWidth=10;
  const fieldHeight=15;
  const canvasWidth=(fieldWidth+2)*boxSize
  const canvasHeight=(fieldHeight+1)*boxSize;
  const boardColor="gray"

  var boardMap:number[][];
  
  let offsetY=0; //
  let sppedY=1;
  let gameInitalized=false;
  let myShape = null as unknown as Shape;

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
  }

  const createMyShape=()=>{
    myShape=new Shape(Math.floor(Math.random()*7));
    myShape.mx=Math.floor(fieldWidth/2);
  }

  const drawPosPox = (x:number,y:number,c:string,hasOffset:boolean) =>{
    const cx=x*boxSize;
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

  const canShapeMoveDown = ():boolean => {
    const num=myShape.getBlockNum();
    var i=0;
    for(i=0;i<num;++i) {
      const {x,y}=myShape.getBlockPos(i);
      if((y+myShape.my)>=(fieldHeight-1)) {
        return false;
      }
      if(boardMap[myShape.mx+x][myShape.my+y+1]!==-1) return false;
    }
    return true;
  }



  const settleShape=()=>{

    const num=myShape.getBlockNum();
    var i=0;
    for(i=0;i<num;++i) {
      const {x,y}=myShape.getBlockPos(i);
      boardMap[myShape.mx+x][myShape.my+y]=myShape.type;
    }
    createMyShape();
  }
  const moveShape = ()=> {
    if(myShape==null) createMyShape();

    offsetY+=sppedY;
    if(offsetY>=boxSize) {
      offsetY=0;
      if(!canShapeMoveDown()) {
        settleShape();
      } else {
        myShape.my++;
      }
    }
  
  }

  const moveLeft =( ) => {
    myShape.mx--;
  }

  const moveRight =( ) => {
    myShape.mx++;
  }

  const moveDown =() => {
    if(canShapeMoveDown()) myShape.my++;
  }


  const turnShape = ()=>{
    myShape.turnClockWise();
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
}

type GameProp={
  title:string;
}

export default class Play extends Component <GameProp,GameState> {
  heartBeat = () => {
    this.setState((state)=>({...state,
      count: state.count+1,
    }));
    if(!this.state.isRunning) return;
    showBox();
  }

  startRunning =()=>{
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
      isRunning:false
    };
    setInterval(this.heartBeat, 40)

  }  

  render() {

    return (
      <div >
          <h2>Configuration</h2>

        <div>
            <button type="button" onClick={this.startRunning}>
              {this.state.isRunning?"Pause":"Start"}</button>
            <button type="button" onClick={moveLeft}>{"<-"}</button>
            <button type="button" onClick={turnShape}>Turn</button>
            <button type="button" onClick={moveRight}>{"->"}</button>
            <button type="button" onClick={moveDown}>Down</button>
            <div >
            <Canvas height={canvasHeight} width={canvasWidth} />
            </div>


        </div>
      </div>
    );
  }
}
