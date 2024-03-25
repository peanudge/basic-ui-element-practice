import { useEffect, useLayoutEffect, useRef, useState } from "react";
import cx from "./cx";
import data from "./data";
import ViewportContextProvider, { useViewportRect } from "./viewportContext";

type Style = Partial<Record<"left" | "right" | "top" | "bottom", number>>;

const Tooltip = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  const viewportRect = useViewportRect();
  const wrapperRef = useRef<HTMLDetailsElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<Style>({});

  useLayoutEffect(() => {
    if (!wrapperRef.current || !targetRef.current) return;

    const wrapperRect = wrapperRef.current?.getBoundingClientRect();
    const targetRect = targetRef.current?.getBoundingClientRect();
    const verticalKey =
      wrapperRect.bottom + targetRect.height < viewportRect.height
        ? "top"
        : "bottom";
    const horizontalKey =
      wrapperRect.right + targetRect.width < viewportRect.width
        ? "left"
        : "right";

    setStyle({
      [verticalKey]: "100%",
      [verticalKey === "top" ? "bottom" : "top"]: "auto",
      [horizontalKey]: 0,
      [horizontalKey === "left" ? "right" : "left"]: "auto",
    });
  }, [viewportRect]);

  return (
    <details className={cx("details")} data-tooltip={id} ref={wrapperRef}>
      <summary className={cx("summary")} data-tooltip-summary>
        {title}
      </summary>
      <div
        className={cx("tooltip")}
        onClick={(e) => e.stopPropagation()}
        ref={targetRef}
        style={style}
      >
        {description}
      </div>
    </details>
  );
};

const MyHtmlTooltip = () => {
  useEffect(() => {
    const closeAllTooltip = (e: Event) => {
      const target = e.target as HTMLElement;
      document.querySelectorAll("[data-tooltip]").forEach((elem) => {
        if (elem !== target.parentElement) {
          elem.removeAttribute("open");
        }
      });
    };
    window.addEventListener("click", closeAllTooltip);

    return () => {
      window.removeEventListener("click", closeAllTooltip);
    };
  }, []);

  return (
    <>
      <h3>My HTML Tooltip</h3>
      <ViewportContextProvider>
        {data.map((d) => (
          <Tooltip {...d} key={d.id} />
        ))}
      </ViewportContextProvider>
    </>
  );
};
export default MyHtmlTooltip;
