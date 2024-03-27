import { createContext, type Dispatch, type PropsWithChildren, type SetStateAction, useState } from 'react';

export interface CanvasContextType {
  canvas: HTMLCanvasElement;
  setCanvas: Dispatch<SetStateAction<CanvasContextType['canvas']>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  webSocket: WebSocket;
  setWebSocket: Dispatch<SetStateAction<WebSocket>>;
  sessionId: string;
  setSessionId: Dispatch<SetStateAction<string>>;
}

export const CanvasContext = createContext(null as CanvasContextType);

export const CanvasProvider = ({ children }: PropsWithChildren) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>(null);
  const [username, setUsername] = useState('');
  const [webSocket, setWebSocket] = useState<WebSocket>(null);
  const [sessionId, setSessionId] = useState('');

  return (
    <CanvasContext.Provider
      value={{ canvas, setCanvas, username, setUsername, sessionId, setSessionId, webSocket, setWebSocket }}
    >
      {children}
    </CanvasContext.Provider>
  );
};
