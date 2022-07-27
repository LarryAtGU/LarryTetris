import React, { useCallback, useEffect, useRef, useState } from 'react';

interface CanvasProps {
  width: number;
  height: number;
}

type Coordinate = {
  x: number;
  y: number;
};

var canvas2 = document.createElement('canvas');
const usingDoubleBuffer = false;
var canvas2Initialized = false;

const Canvas = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);

  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setMousePosition(coordinates);
      setIsPainting(true);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mousedown', startPaint);
    return () => {
      canvas.removeEventListener('mousedown', startPaint);
    };
  }, [startPaint]);

  const paint = useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition]
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mousemove', paint);

    const onKeyDown = (event: KeyboardEvent) => {
      console.log('Key Down', event.key);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      canvas.removeEventListener('mousemove', paint);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [paint]);

  const exitPaint = useCallback(() => {
    setIsPainting(false);
    setMousePosition(undefined);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);
    return () => {
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);
    };
  }, [exitPaint]);

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop };
  };

  const drawLine = (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    if (context) {
      context.strokeStyle = 'red';
      context.lineJoin = 'round';
      context.lineWidth = 5;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };

  return <canvas ref={canvasRef} height={height} width={width} id="mycanvas" />;
};

Canvas.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const tryInitializeCanvas2 = () => {
  if (!usingDoubleBuffer) return false;
  if (canvas2Initialized) return true;

  var canvas = document.getElementById('mycanvas') as HTMLCanvasElement;
  var ctx = canvas.getContext('2d');
  if (ctx === null) return false;
  canvas2.width = canvas.width;
  canvas2.height = canvas.height;

  var ctx2 = canvas2.getContext('2d');

  if (ctx2 === null) return false;
  canvas2Initialized = true;
  return true;
};

export const showCanvas = () => {
  if (!tryInitializeCanvas2()) return;
  var canvas = document.getElementById('mycanvas') as HTMLCanvasElement;
  var ctx = canvas.getContext('2d');

  ctx?.drawImage(canvas2, 0, 0);
};
export const clearCanvas = () => {
  var canvas = document.getElementById('mycanvas') as HTMLCanvasElement;
  var ctx = null;
  if (tryInitializeCanvas2()) {
    ctx = canvas2.getContext('2d');
  } else {
    ctx = canvas.getContext('2d');
  }
  if (ctx !== null) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};

export const drawBox = (x: number, y: number, w: number, h: number, color: string) => {
  var canvas = document.getElementById('mycanvas') as HTMLCanvasElement;
  var ctx = null;
  if (tryInitializeCanvas2()) {
    ctx = canvas2.getContext('2d');
  } else {
    ctx = canvas.getContext('2d');
  }
  if (ctx !== null) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }
};

export default Canvas;
