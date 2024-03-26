import type { Dispatch, SetStateAction } from 'react';

export type Tool = 'brush';

export interface EventHandlers {
  handlePointerMove: (event: PointerEvent) => void;
  handlePointerDown: (event: PointerEvent) => void;
  handlePointerUp: (event: PointerEvent) => void;
}

export interface PaintContextType {
  tool: Tool;
  setTool: Dispatch<SetStateAction<Tool>>;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}
