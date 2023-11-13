// @ts-check

/**
 * Run any <script> tags in an element.
 * Credit: https://stackoverflow.com/a/47614491
 *
 * @param {Element} el
 */
export function activateScripts(el) {
  Array.from(el.querySelectorAll('script')).forEach(oldScriptEl => {
    const newScriptEl = document.createElement('script');

    Array.from(oldScriptEl.attributes).forEach(attr => {
      newScriptEl.setAttribute(attr.name, attr.value);
    });

    const scriptText = document.createTextNode(oldScriptEl.innerHTML);
    newScriptEl.appendChild(scriptText);

    if (oldScriptEl.parentNode) {
      oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
    }
  });
}
