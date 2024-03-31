export const measureLines = (elem: HTMLTextAreaElement, value: string) => {
  if (!elem || !value) return 0;
  const canvas = document.createElement("canvas");
  const canvasContext: CanvasRenderingContext2D = canvas.getContext("2d")!;
  const style = window.getComputedStyle(elem);
  canvasContext.font = `${style.getPropertyValue(
    "font-size"
  )} ${style.getPropertyValue("font-family")}`;
  const measuredLines = value.split("\n").reduce((r, c) => {
    return (
      r +
      Math.max(
        Math.ceil(canvasContext.measureText(c).width / elem!.offsetWidth),
        1
      )
    );
  }, 0);
  return measuredLines;
};

