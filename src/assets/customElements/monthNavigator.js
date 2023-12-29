// @ts-check
import { onParsed, waitForElement } from '../lib/customElements';

export default class extends HTMLElement {
  /** @type {HTMLInputElement} */
  #month;

  /** @type {HTMLInputElement} */
  #year;

  connectedCallback() {
    onParsed(() => {
      const parent = /** @type {HTMLElement} */ (this.parentElement);

      const findFields = /** @type {Promise<[HTMLInputElement, HTMLInputElement]>} */ (Promise.all(
        [
          waitForElement(this.dataset.monthTarget || '', parent, {
            timeout: 3000
          }),
          waitForElement(this.dataset.yearTarget || '', parent, {
            timeout: 3000
          })
        ]
      ));

      findFields.then(([month, year]) => {
        // Assume month is 1 (January) to 12 (December)
        this.#month = month;
        this.#year = year;

        const previousBtn = /** @type {HTMLButtonElement} */ (this.querySelector(
          'button[data-previous]'
        ));

        const todayBtn = /** @type {HTMLButtonElement} */ (this.querySelector(
          'button[data-today]'
        ));

        const nextBtn = /** @type {HTMLButtonElement} */ (this.querySelector(
          'button[data-next]'
        ));

        previousBtn.addEventListener('click', () => {
          this._updateMonth(+month.value - 1);
        });

        todayBtn.addEventListener('click', () => {
          const today = new Date();
          month.value = (today.getMonth() + 1).toString();
          year.value = today.getFullYear().toString();
          // Trigger change on either field, but only once
          year.dispatchEvent(new Event('change'));
        });

        nextBtn.addEventListener('click', () => {
          this._updateMonth(+month.value + 1);
        });
      });
    });
  }

  /**
   * @param {number} month
   */
  _updateMonth(month) {
    if (month < 1) {
      month += 12;
      this.#year.value = (+this.#year.value - 1).toString();
    }

    if (month > 12) {
      month -= 12;
      this.#year.value = (+this.#year.value + 1).toString();
    }

    this.#month.value = month.toString();
    this.#month.dispatchEvent(new Event('change'));
  }
}
