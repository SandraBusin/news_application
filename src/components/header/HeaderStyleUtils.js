/* eslint-disable import/prefer-default-export */

export function setActiveClass(element) {
  const { classList } = element;
  const [elmentDefaultClass] = classList;
  const allElementsWithClass = document.getElementsByClassName(
    elmentDefaultClass
  );
  const elements = Object.keys(allElementsWithClass);
  elements.forEach((el) => {
    const elementItem = allElementsWithClass[el];
    if (elementItem.classList.contains("activeItem")) {
      elementItem.classList.remove("activeItem");
    }
  });
  classList.add("activeItem");
}
