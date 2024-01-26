// @ts-check

export default class extends HTMLElement {
  connectedCallback() {
    const selector = this.dataset.source;

    if (!selector) {
      return;
    }

    const input = /** @type {HTMLInputElement|null} */ (document.querySelector(
      selector
    ));

    if (!input) {
      throw new Error(`input at '${selector}' was not found`);
    }

    const btn = /** @type {HTMLButtonElement} */ (this.querySelector('button'));

    btn.addEventListener('click', () => {
      input.select(); // Visual feedback
      navigator.clipboard.writeText(input.value);
    });
  }
}
