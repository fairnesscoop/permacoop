// @ts-check

export default class extends HTMLButtonElement {
  /** @type {HTMLInputElement} */
  #sourceEl;

  connectedCallback() {
    const sourceSelector = this.dataset.clipboardButtonSource;

    if (!sourceSelector) {
      throw new Error('data-clipboard-button-source is missing');
    }

    const sourceEl = /** @type {HTMLInputElement|null} */ (document.querySelector(
      sourceSelector
    ));

    if (!sourceEl) {
      throw new Error(`element '${sourceSelector}' was not found`);
    }

    this.#sourceEl = sourceEl;

    this.addEventListener('click', this.#handleClick);
  }

  #handleClick = () => {
    this.#sourceEl.select(); // Visual feedback
    navigator.clipboard.writeText(this.#sourceEl.value);
  };

  disconnectedCallback() {
    this.removeEventListener('click', this.#handleClick);
  }
}
