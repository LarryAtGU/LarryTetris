import {Shape} from "../components/shapes"
let testBoard:number[][];
let examBoard:number[][];
let shape:Shape; 
let width:number;
let height:number;




export const initAI= (board:number[][],sp:Shape, w:number,h:number) => {
  testBoard=JSON.parse(JSON.stringify(board));
  shape=JSON.parse(JSON.stringify(sp));
  w=width;
  h=height;
}

export const getMiniAct = () :[_:number, _:number] => {
  let minShift:number=0;
  let minTurn:number=0;
  let minVal:number=1000;
  let turn=0;
  let shift=0;
  let value=0;
  for(turn =0; turn<4; ++turn) {
    const [sleft,sright]=shape.getShiftRange(width);
    for(shift=sleft;shift<=sright; ++shift) {
      value=getShiftValue(shape,shift)
    }

  }
  return [minShift,minTurn];
}
const getShiftValue=(sp:Shape,shift:number):number=>{
  let ret=0;

  come to here
  return ret;
}
const getEvaluate = () => {
  let ret=0;
  let h,w;
  let v=0;
  for(h=height-1;h>1;--h) {
    v++;
    for(w=0;w<width;++w) {
      if(examBoard[w][h]!==-1) {
        ret+=v; 
      }else {
        if(examBoard[w][h-1]!==-1) {
          ret+=v+4;
        }
      }
    }
  }
  return ret;
}

