import { useState } from "react";
import cx from "./cx";
import data from "./data";

const AccordionItem = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  return (
    <li className={cx("item", "item5")} key={id}>
      <input id={id} type="radio" name="accordion" className={cx("input")} />
      <label htmlFor={id} className={cx("tab")}>
        {title}
      </label>
      <div className={cx("description")}>{description}</div>
    </li>
  );
};

const MyReactAccordion = () => {
  return (
    <>
      <h3>My React Accordion</h3>
      <ul className={cx("container")}>
        {data.map((d) => (
          <AccordionItem key={d.id} {...d} />
        ))}
      </ul>
    </>
  );
};

export default MyReactAccordion;
