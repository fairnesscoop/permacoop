export const clickOutside = (
  node: HTMLElement,
  callback: () => void
): {
  destroy: () => void;
} => {
  const handleClick = (event: Event) => {
    if (!node.contains(event.target as HTMLElement)) {
      callback();
    }
  };

  document.addEventListener("click", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    },
  };
};
