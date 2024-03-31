import { useEffect, useRef } from "react";
import cx from "./cx";

const measureLines = (elem: HTMLTextAreaElement, value: string) => {
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

const MyReactUncontrolledTextBox = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const elem = textAreaRef.current;
    const handleInput = () => {
      if (!elem) return;
      const val = elem.value;
      const lines = Math.min(Math.max(measureLines(elem, val), 3), 15);
      elem.rows = lines;
    };
    elem?.addEventListener("input", handleInput);
    return () => {
      elem?.removeEventListener("input", handleInput);
    };
  }, []);
  return (
    <>
      <h3>My React Uncontrolled Text Box</h3>
      <div className={cx("container")}>
        <textarea ref={textAreaRef} rows={3} />
      </div>
    </>
  );
};

export default MyReactUncontrolledTextBox;
