import './Canvas.css';
import { useCanvas } from '@/providers';
import { useEffect, useRef } from 'react';

export const Canvas = () => {
  const { setCanvas } = useCanvas();
  const canvasRef = useRef();

  useEffect(() => {
    setCanvas(canvasRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- set canvas node with access if on mount he does not exist
  }, [setCanvas, canvasRef.current]);

  return (
    <div className={'canvas'}>
      <canvas ref={canvasRef} width={1200} height={600} />
    </div>
  );
};
