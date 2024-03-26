import { useContext } from 'react';
import { CanvasContext } from './CanvasProvider';

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error('useCanvas must be used within a CanvasContext');
  }

  return context;
};
