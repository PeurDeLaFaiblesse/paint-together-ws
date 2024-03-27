export const draw = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.lineTo(x, y);
  ctx.stroke();
};
