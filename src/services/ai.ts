import { Shape } from '../components/shapes';
let board: number[][];
let shape: Shape;
let width: number;
let height: number;

export const initAI = (bd: number[][], sp: Shape, w: number, h: number) => {
  board = JSON.parse(JSON.stringify(bd));
  shape = new Shape(sp.type);
  shape.mx = sp.mx;
  shape.my = sp.my;
  width = w;
  height = h;
};

const getShapeCopy = (turn: number): Shape => {
  const sp = new Shape(shape.type);
  sp.mx = shape.mx;
  sp.my = shape.my;
  while (turn--) sp.turnClockWise();
  return sp;
};
const getBoardCopy = (): number[][] => {
  const ret = JSON.parse(JSON.stringify(board));
  return ret;
};
export const getMiniAct = (): { shift: number; turn: number }[] => {
  let minVal: number = 10000;
  let turn = 0;
  let shift = 0;
  let value = 0;
  let ret: { shift: number; turn: number }[] = [];

  const minifulturn = shape.getMeaningfulTurnNum();

  for (turn = 0; turn < minifulturn; ++turn) {
    const [sleft, sright] = shape.getShiftRange(width);

    for (shift = sleft; shift <= sright; ++shift) {
      value = getShiftValue(shift, turn);

      if (value < minVal) {
        ret = [{ shift: shift, turn: turn }];
        minVal = value;
      } else {
        if (value === minVal) {
          ret.push({ shift: shift, turn: turn });
        }
      }
    }
    shape.turnClockWise();
  }

  return ret;
};

const getShiftValue = (shift: number, turn: number): number => {
  const testShape = getShapeCopy(turn);
  testShape.shift(shift);
  const testBoard = getBoardCopy();

  const blks = testShape.getBlockNum();
  let possibleDrop = 1000;

  for (let i = 0; i < blks; ++i) {
    const { x, y } = testShape.getBlockPos(i);
    const firstBlk = getFirstBlk(x + testShape.mx, testBoard);
    possibleDrop = firstBlk - (testShape.my + y) < possibleDrop ? firstBlk - (testShape.my + y) : possibleDrop;
  }
  possibleDrop--;

  testShape.drop(possibleDrop);

  for (let i = 0; i < blks; ++i) {
    const { x, y } = testShape.getBlockPos(i);
    testBoard[x + testShape.mx][y + testShape.my] = 1; // filling the testboard.
  }
  processFullRow(testBoard);
  return getEvaluate(testBoard);
};

const processFullRow = (blks: number[][]) => {
  const ret = [] as number[];
  let i = 0;
  let j = 0;
  var isFullLine = false;
  for (i = 0; i < height; ++i) {
    isFullLine = true; // assume full line
    for (j = 0; j < width; ++j) {
      if (blks[j][i] === -1) {
        isFullLine = false;
        break;
      }
    }
    if (isFullLine) {
      ret.push(i);
    }
  }
  if (ret.length > 0) {
    const len = ret.length;
    let row, r, c;
    for (let i = 0; i < len; ++i) {
      row = ret[i];
      for (r = row; r > 0; --r) {
        for (c = 0; c < width; ++c) {
          blks[c][r] = blks[c][r - 1];
        }
      }
    }
    for (r = len; r >= 0; --r) {
      for (c = 0; c < width; ++c) blks[c][r] = -1;
    }
  }
};

const getFirstBlk = (x: number, brd: number[][]) => {
  let ret = 0;

  for (ret = 0; ret < height; ++ret) {
    if (brd[x][ret] !== -1) return ret;
  }
  return height;
};

const getEvaluate = (examBoard: number[][]) => {
  let ret = 0;
  let h, w;
  let v = 0;
  for (h = height - 1; h > 1; --h) {
    v++;
    for (w = 0; w < width; ++w) {
      if (examBoard[w][h] !== -1) {
        ret += v;
      } else {
        if (examBoard[w][h - 1] !== -1) {
          ret += v + 6;
        }
      }
    }
  }
  return ret;
};
