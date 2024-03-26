import { createContext, type Dispatch, type PropsWithChildren, type SetStateAction, useState } from 'react';

export interface CanvasContextType {
  canvas: HTMLCanvasElement;
  setCanvas: Dispatch<SetStateAction<CanvasContextType['canvas']>>;
}

export const CanvasContext = createContext(null as CanvasContextType);

export const CanvasProvider = ({ children }: PropsWithChildren) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>(null);

  return <CanvasContext.Provider value={{ canvas, setCanvas }}>{children}</CanvasContext.Provider>;
};
