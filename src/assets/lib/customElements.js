// The 'connectedCallback' on customElements is fired when the opening tag
// is processed. So children may not be available. If custom elements need to
// process them, then they need to wait for the rest of the DOM to be processed.
// This can be done by waiting for the next step in the event loop.
// This function encapsulates this oddity so the resulting code in custom
// elements is cleaner.
export function onParsed(cb) {
  requestAnimationFrame(cb);
}

/**
 * Wait until an element appears in the DOM.
 * Credit: https://stackoverflow.com/a/61511955
 * @param {string} selector
 * @param {Element} root
 * @param {{timeout?: number}} options
 * @returns {Promise<Element>}
 */
export function waitForElement(selector, root, { timeout } = {}) {
  return new Promise(resolve => {
    let timeoutHandle;

    if (timeout) {
      timeoutHandle = setTimeout(
        () => reject(`failed to find ${selector} after ${timeout} ms`),
        timeout
      );
    }

    if (document.querySelector(selector)) {
      clearTimeout(timeoutHandle);
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(_mutations => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        clearTimeout(timeoutHandle);
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(root, { childList: true, subtree: true });
  });
}
