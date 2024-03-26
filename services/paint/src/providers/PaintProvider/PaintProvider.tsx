import { createContext, type PropsWithChildren, useEffect, useState } from 'react';
import { useCanvas } from '@/providers';
import type { PaintContextType, Tool } from './types';
import { getEventHandlers } from './lib';

export const PaintContext = createContext(null as PaintContextType);

export const PaintProvider = ({ children }: PropsWithChildren) => {
  const [tool, setTool] = useState<Tool>('brush');
  const [color, setColor] = useState('black');

  const { canvas } = useCanvas();

  useEffect(() => {
    if (!canvas) {
      return;
    }

    const canvasDup = canvas;

    const { handlePointerMove, handlePointerDown, handlePointerUp } = getEventHandlers({ tool, canvas: canvasDup });

    canvasDup.addEventListener('pointermove', handlePointerMove);
    canvasDup.addEventListener('pointerdown', handlePointerDown);
    canvasDup.addEventListener('pointerup', handlePointerUp);

    return () => {
      canvasDup.removeEventListener('pointermove', handlePointerMove);
      canvasDup.removeEventListener('pointerdown', handlePointerDown);
      canvasDup.removeEventListener('pointerup', handlePointerUp);
    };
  }, [canvas, tool]);

  return <PaintContext.Provider value={{ tool, setTool, color, setColor }}>{children}</PaintContext.Provider>;
};
