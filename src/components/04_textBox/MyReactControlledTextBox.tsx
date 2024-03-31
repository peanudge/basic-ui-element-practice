import { SyntheticEvent, useState } from "react";
import cx from "./cx";
import { measureLines } from "./measureLines";

const MyReactControlledTextBox = () => {
  const [text, setText] = useState("");
  const [lines, setLines] = useState(3);
  const handleChange = (e: SyntheticEvent) => {
    const elem = e.target as HTMLTextAreaElement;
    const val = elem.value;
    const lines = Math.min(Math.max(measureLines(elem, val), 3), 15);
    setText(val);
    setLines(lines);
  };
  return (
    <>
      <h3>My React Controlled Text Box</h3>
      <div className={cx("container")}>
        <textarea onChange={handleChange} value={text} rows={lines} />
      </div>
    </>
  );
};

export default MyReactControlledTextBox;
