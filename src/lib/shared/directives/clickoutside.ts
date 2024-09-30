export const clickOutside = (node: HTMLElement, callback: (event: MouseEvent) => void) => {
  const handleClick = (event: MouseEvent) => {
    if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
      callback(event);
      // node.dispatchEvent(new CustomEvent('click_outside', node));
    }
  };

  document.addEventListener("click", handleClick, true);
  document.addEventListener("mousedown", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("mousedown", handleClick, true);
    }
  };
};
