import type { EventHandlers, Tool } from './types';

interface This {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  webSocket: WebSocket;
  sessionId: string;
  mouseDown?: boolean;
}

const getBrushEventHandlers = function (this: This): EventHandlers {
  const handlePointerMove = (event: PointerEvent) => {
    if (this.mouseDown) {
      this.webSocket.send(
        JSON.stringify({
          id: this.sessionId,
          method: 'draw',
          tool: 'brush',
          x: event.pageX - this.canvas.offsetLeft,
          y: event.pageY - this.canvas.offsetTop,
        }),
      );
    }
  };
  const handlePointerDown = () => {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.webSocket.send(
      JSON.stringify({
        id: this.sessionId,
        method: 'draw',
        tool: 'finish',
      }),
    );
  };
  const handlePointerUp = () => {
    this.mouseDown = false;
  };

  return { handlePointerMove, handlePointerDown, handlePointerUp };
};

export const getEventHandlers = ({
  tool,
  canvas,
  webSocket,
  sessionId,
}: {
  tool: Tool;
  canvas: HTMLCanvasElement;
  webSocket: WebSocket;
  sessionId: string;
}): EventHandlers => {
  const ctx = canvas.getContext('2d');

  switch (tool) {
    case 'brush':
      return getBrushEventHandlers.call({ ctx, canvas, webSocket, sessionId });
    default: {
      const n: never = tool;
      throw new Error(`Assertion failed, value = ${n}`);
    }
  }
};
