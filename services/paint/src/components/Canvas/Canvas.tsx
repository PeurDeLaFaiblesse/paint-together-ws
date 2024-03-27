import './Canvas.css';
import { useCanvas } from '@/providers';
import { useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { draw as drawBrush } from '@/providers/PaintProvider/tools';
import axios from 'axios';

export const Canvas = () => {
  const { canvas, setCanvas, username, setUsername, setSessionId, setWebSocket } = useCanvas();
  const canvasRef = useRef();
  const { id } = useParams();

  const handleMouseUp = useCallback(() => {
    axios.post(import.meta.env.VITE_BACKEND + `/canvas?sessionId=${id}`, { canvas: canvas.toDataURL() });
  }, [canvas, id]);

  const handleDraw = useCallback(
    (message) => {
      const ctx = canvas.getContext('2d');

      switch (message.tool) {
        case 'brush': {
          drawBrush(ctx, message.x, message.y);
          break;
        }
        case 'finish': {
          ctx.beginPath();
          break;
        }
        default: {
          const n: never = message.tool;
          throw new Error(`Assertion failed, value = ${n}`);
        }
      }
    },
    [canvas],
  );

  useEffect(() => {
    setCanvas(canvasRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- set canvas node with access if on mount he does not exist
  }, [setCanvas, canvasRef.current]);

  useEffect(() => {
    if (!canvas || !id) {
      return;
    }

    axios.get(import.meta.env.VITE_BACKEND + `/canvas?sessionId=${id}`).then((res) => {
      const ctx = canvas.getContext('2d');

      const image = new Image();
      image.src = res.data;
      image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        ctx.stroke();
      };
    });
  }, [canvas, id]);

  useEffect(() => {
    let username = window.prompt('Введите свой "username"');

    while (!username) {
      username = window.prompt('Введите свой "username"');
    }

    setUsername(username);
  }, [id, setUsername]);

  useEffect(() => {
    if (!id || !username) {
      return;
    }

    const webSocket = new WebSocket(import.meta.env.VITE_WEB_SOCKET);
    setWebSocket(webSocket);
    setSessionId(id);

    webSocket.onopen = () => {
      webSocket.send(JSON.stringify({ id, method: 'connection', username }));
    };

    webSocket.onmessage = (ev) => {
      const message = JSON.parse(ev.data);

      switch (message.method) {
        case 'connection': {
          console.log(`${message.username} was connected`);
          break;
        }
        case 'draw': {
          handleDraw(message);
          break;
        }
      }
    };
  }, [handleDraw, id, setSessionId, setWebSocket, username]);

  return (
    <div className={'canvas'}>
      <canvas onPointerUp={handleMouseUp} ref={canvasRef} width={1200} height={600} />
    </div>
  );
};
