import { PropsWithChildren } from 'react';
import { CanvasProvider, PaintProvider } from '@/providers';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <CanvasProvider>
      <PaintProvider>{children}</PaintProvider>
    </CanvasProvider>
  );
};
