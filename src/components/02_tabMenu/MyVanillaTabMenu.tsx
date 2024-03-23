import VanillaWrapper from "../vanillaWrapper";
import cx from "./cx";
import data from "./data";

const buildTabMenu = ({ id, title }: { id: string; title: string }) => {
  const liElement = document.createElement("li");
  liElement.classList.add(cx("tab"));
  liElement.textContent = title;
  liElement.dataset.id = id;
  return liElement;
};

const buildDescription = ({
  id,
  description,
}: {
  id: string;
  description: string;
}) => {
  const divElement = document.createElement("div");
  divElement.classList.add(cx("description"));
  divElement.textContent = description;
  divElement.dataset.id = id;
  return divElement;
};

const initiator = (wrapper: HTMLDivElement) => {
  let currentId: string = data[0].id;

  const containerElement = document.createElement("div");
  containerElement.classList.add(cx("container"), cx("tabMenu2"));

  const tabUlElement = document.createElement("ul");
  tabUlElement.classList.add(cx("tabList"));

  const tabElements = data.map(buildTabMenu);
  const descriptionElements = data.map(buildDescription);

  tabUlElement.append(...tabElements);
  containerElement.append(tabUlElement, ...descriptionElements);

  const handleClickTab = (e: Event) => {
    const element = e.target as HTMLElement;
    if (!element.classList.contains(cx("tab"))) return;

    const currentId = element.dataset.id || data[0].id;

    tabElements.forEach((tabElement, idx) => {
      tabElement.classList.toggle(
        cx("current"),
        tabElement.dataset.id === currentId
      );
      descriptionElements[idx].classList.toggle(
        cx("current"),
        descriptionElements[idx].dataset.id === currentId
      );
    });
  };
  tabUlElement.addEventListener("click", handleClickTab);

  wrapper.append(containerElement);
  tabElements[0].click();
};
const MyVanillaTabMenu = () => <VanillaWrapper initiator={initiator} />;

export default MyVanillaTabMenu;
