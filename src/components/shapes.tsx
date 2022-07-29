export class Shape {
  mx = 0;
  my = 0;
  col = 'red';
  colorarr = ['aqua', 'blue', 'maroon', 'yellow', 'green', 'purple', 'red', 'olive', 'fuchsia', 'teal'];
  blocks: { x: number; y: number }[];
  type: number;
  constructor(t: number) {
    this.type = t;
    this.blocks = [{ x: 0, y: 0 }];
    this.initShape();
  }
  initShape(): void {
    this.col = this.colorarr[this.type];
    switch (this.type) {
      case 0: // long four
        this.blocks = [
          { x: -1, y: 0 },
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 2, y: 0 },
        ];
        break; //long 1
      case 1: // L shape
        this.blocks = [
          { x: -1, y: -1 },
          { x: -1, y: 0 },
          { x: 0, y: 0 },
          { x: 1, y: 0 },
        ];
        break;
      case 2:
        this.blocks = [
          { x: -1, y: 0 },
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 1, y: -1 },
        ];
        break;
      case 3:
        this.blocks = [
          { x: 0, y: -1 },
          { x: 0, y: 0 },
          { x: 1, y: -1 },
          { x: 1, y: 0 },
        ];
        break;
      case 4:
        this.blocks = [
          { x: -1, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: -1 },
          { x: 1, y: -1 },
        ];
        break;
      case 5:
        this.blocks = [
          { x: -1, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: -1 },
          { x: 1, y: 0 },
        ];
        break;

      case 6:
        this.blocks = [
          { x: -1, y: -1 },
          { x: 0, y: -1 },
          { x: 0, y: 0 },
          { x: 1, y: 0 },
        ];
        break;
      case 7:
        this.blocks = [
          { x: -1, y: -1 },
          { x: 0, y: -1 },
          { x: 0, y: 0 },
        ];
        break;
      case 8:
        this.blocks = [
          { x: -1, y: 0 },
          { x: 0, y: 0 },
          { x: 1, y: 0 },
        ];
        break;
      case 9:
        this.blocks = [
          { x: -1, y: 0 },
          { x: 0, y: 0 },
        ];
        break;
    }
  }
  turnClockWise(): void {
    const len = this.blocks.length;
    let i = 0;
    var tmpx, tmpy;
    for (i = 0; i < len; ++i) {
      tmpx = this.blocks[i].x;
      tmpy = this.blocks[i].y;
      this.blocks[i].x = -tmpy;
      this.blocks[i].y = tmpx;
    }
  }

  getBlockNum(): number {
    return this.blocks.length;
  }
  getBlockPos(i: number): { x: number; y: number } {
    return this.blocks[i];
  }
  getColor(): string {
    return this.col;
  }
  getTypeColor(tp: number): string {
    if (tp < 0) return 'white';
    if (tp >= this.colorarr.length) return 'white';
    return this.colorarr[tp];
  }

  getMoveDownPoses(): { x: number; y: number }[] {
    return this.blocks.map((blk) => ({ x: blk.x + this.mx, y: blk.y + this.my + 1 }));
  }

  getMoveLeftPoses(): { x: number; y: number }[] {
    return this.blocks.map((blk) => ({ x: blk.x + this.mx - 1, y: blk.y + this.my }));
  }

  getMoveRightPoses(): { x: number; y: number }[] {
    return this.blocks.map((blk) => ({ x: blk.x + this.mx + 1, y: blk.y + this.my }));
  }

  getTurnPoses(): { x: number; y: number }[] {
    return this.blocks.map((blk) => ({ x: this.mx - blk.y, y: this.my + blk.x }));
  }
  getShiftRange(w: number) {
    const left = this.blocks.reduce((ack, blk) => (ack = Math.min(-(blk.x + this.mx), ack)), 0);
    const right = this.blocks.reduce((ack, blk) => (ack = Math.max(w - blk.x - 1, ack)), 0);
    return [left, right];
  }
}
