import { SyntheticEvent, useEffect } from "react";
import cx from "./cx";
import data from "./data";
import SingleOpenContextProvider, { useSingleOpen } from "./singleOpenContext";
import ViewportContextProvider from "./viewportContext";

const Tooltip = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  const [isOpen, toggle] = useSingleOpen(id);

  const handleClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    toggle((p) => (p === id ? null : id));
  };

  useEffect(() => {
    const close = () => toggle(null);
    if (isOpen) {
      window.addEventListener("click", close, { once: true });
    }

    return () => {
      window.removeEventListener("click", close);
    };
  }, [isOpen, toggle]);

  return (
    <div className={cx("container")}>
      <button className={cx("trigger")} onClick={handleClick}>
        {title}
      </button>
      {isOpen && (
        <div onClick={(e) => e.stopPropagation()} className={cx("tooltip")}>
          {description}
        </div>
      )}
    </div>
  );
};

const MyReactToolTip = () => {
  return (
    <>
      <h3>My React Tooltip</h3>
      <ViewportContextProvider>
        <SingleOpenContextProvider>
          {data.map((d) => (
            <Tooltip {...d} key={d.id} />
          ))}
        </SingleOpenContextProvider>
      </ViewportContextProvider>
    </>
  );
};
export default MyReactToolTip;
