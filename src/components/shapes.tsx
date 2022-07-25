export class Shape {
    mx=0;
    my=0;
    col="red"
    blocks:{x:number,y:number}[]
    type:number;
    constructor(t:number) {
        this.type=t;
        this.blocks=[{x:0,y:0}];
        this.initShape();
    }
    initShape():void {
        switch(this.type) {
            case 0:
                this.col='aqua';
                this.blocks=[{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:2,y:0}];
                break; //long 1
            case 1:
                this.col='blue';
                this.blocks=[{x:-1,y:-1},{x:-1,y:0},{x:0,y:0},{x:1,y:0}];
                break;
            case 2:
                this.col='maroon';
                this.blocks=[{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:1,y:-1}];
                break;
            case 3:
                this.col='yellow';
                this.blocks=[{x:0,y:-1},{x:0,y:0},{x:1,y:-1},{x:1,y:0}];
                break;
            case 4:
                this.col='green';
                this.blocks=[{x:-1,y:0},{x:0,y:0},{x:0,y:-1},{x:1,y:-1}];
                break;
            case 5:
                this.col='purple';
                this.blocks=[{x:-1,y:0},{x:0,y:0},{x:0,y:-1},{x:1,y:0}];
                break;

            case 6:
                this.col='red';
                this.blocks=[{x:-1,y:-1},{x:0,y:-1},{x:0,y:0},{x:1,y:0}];
                break;

        }
    }
    turnClockWise():void {
        const len=this.blocks.length;
        let i=0;
        var tmpx,tmpy
        for(i=0;i<len;++i) {
            tmpx=this.blocks[i].x;
            tmpy=this.blocks[i].y;
            this.blocks[i].x=-tmpy;
            this.blocks[i].y=tmpx;
        }
    }

    getBlockNum():number {
        return this.blocks.length;
    }
    getBlockPos(i:number):{x:number,y:number} {
        return this.blocks[i];
    }
    getColor():string {
        return this.col;
    }
    getTypeColor(tp:number):string {
        const colorarr=['aqua','blue','maroon','yellow','green','purple','red'];
        if(tp<0) return 'white';
        if(tp>=colorarr.length)return 'white';
        return colorarr[tp];

    }
}