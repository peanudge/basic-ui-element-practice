import VanillaWrapper from "../vanillaWrapper";
import cx from "./cx";
import data from "./data";

const itemBuilder = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  const liElement = document.createElement("li");
  liElement.classList.add(cx("item"), cx("item3"));
  liElement.setAttribute("data-id", id);

  const tabElement = document.createElement("div");
  tabElement.classList.add(cx("tab"));
  tabElement.textContent = title;

  const descriptionElement = document.createElement("div");
  descriptionElement.classList.add(cx("description"));
  descriptionElement.textContent = description;

  liElement.append(tabElement, descriptionElement);
  return liElement;
};

const initiator = (wrapper: HTMLDivElement) => {
  let currentId: string | null = null;

  const ulElement = document.createElement("ul");
  ulElement.classList.add(cx("container"));

  const handleClickTab = (e: Event) => {
    const element = e.target as HTMLElement;
    if (!element.classList.contains(cx("tab"))) return;

    const targetId = element.parentElement!.dataset.id;
    if (!targetId) return;

    currentId = currentId === targetId ? null : targetId;

    itemElements.forEach((itemElement) => {
      itemElement.classList.toggle(
        cx("current"),
        currentId === itemElement.dataset.id
      );
    });
  };

  ulElement.addEventListener("click", handleClickTab);

  const itemElements = data.map(itemBuilder);
  ulElement.append(...itemElements);

  wrapper.append(ulElement);

  (itemElements[0].children[0] as HTMLElement).click();
};

const MyVanillaAccordion = () => {
  return (
    <>
      <VanillaWrapper title="My Vanilla Accordion" initiator={initiator} />
    </>
  );
};

export default MyVanillaAccordion;
