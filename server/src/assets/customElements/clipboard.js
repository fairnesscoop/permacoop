export default class extends HTMLButtonElement {
  connectedCallback() {
    /** @type {HTMLInputElement|null} */
    const sourceEl = document.querySelector(this.dataset.clipboardSource);

    if (!sourceEl) {
      throw new Error('Source element not found');
    }

    this.sourceEl = sourceEl;

    this.addEventListener('click', this.#handleClick);
  }

  #handleClick = () => {
    this.sourceEl.select(); // Visual feedback
    navigator.clipboard.writeText(this.sourceEl.value);
  };

  disconnectedCallback() {
    this.removeEventListener('click', this.#handleClick);
  }
}
