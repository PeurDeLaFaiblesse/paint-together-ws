import type { EventHandlers, Tool } from './types';

interface This {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  mouseDown?: boolean;
}

const getBrushEventHandlers = function (this: This): EventHandlers {
  const handlePointerMove = (event: PointerEvent) => {
    if (this.mouseDown) {
      this.ctx.lineTo(event.pageX - this.canvas.offsetLeft, event.pageY - this.canvas.offsetTop);
      this.ctx.stroke();
    }
  };
  const handlePointerDown = () => {
    this.mouseDown = true;
    this.ctx.beginPath();
  };
  const handlePointerUp = () => {
    this.mouseDown = false;
  };

  return { handlePointerMove, handlePointerDown, handlePointerUp };
};

export const getEventHandlers = ({ tool, canvas }: { tool: Tool; canvas: HTMLCanvasElement }): EventHandlers => {
  const ctx = canvas.getContext('2d');

  switch (tool) {
    case 'brush':
      return getBrushEventHandlers.call({ ctx, canvas });
    default: {
      const n: never = tool;
      throw new Error(`Assertion failed, value = ${n}`);
    }
  }
};
