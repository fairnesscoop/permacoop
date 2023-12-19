// @ts-check
import { onParsed } from '../lib/customElements';

export default class extends HTMLElement {
  /** @type {HTMLFormElement} */
  #form;

  connectedCallback() {
    onParsed(() => {
      const form = /** @type {HTMLFormElement} */ (this.querySelector('form'));

      // Progressive enhancement:
      // If this custom element activates, enable auto-submission and remove the manual submit button.
      const submitBtn = /** @type {HTMLButtonElement} */ (this.querySelector(
        'button[type="submit"]'
      ));
      const navigationTemplate = /** @type {HTMLTemplateElement} */ (this.querySelector(
        '#faircalendar-filters-form-navigation'
      ));
      const navigation = document.importNode(navigationTemplate.content, true);
      navigationTemplate.after(navigation);
      submitBtn.remove();

      this.#form = form;

      form.previousBtn.addEventListener('click', () => {
        this._updateMonth(+form.month.value - 1);
        this._submit();
      });

      form.todayBtn.addEventListener('click', () => {
        const today = new Date();
        form.month.value = today.getMonth();
        form.year.value = today.getFullYear();
        this._submit();
      });

      form.nextBtn.addEventListener('click', () => {
        this._updateMonth(+form.month.value + 1);
        this._submit();
      });

      form.month.addEventListener('change', () => {
        this._submit();
      });

      form.year.addEventListener('change', () => {
        this._submit();
      });

      form.userId.addEventListener('change', () => {
        this._submit();
      });
    });
  }

  _submit() {
    this.#form.requestSubmit();
  }

  /**
   * @param {number} month
   */
  _updateMonth(month) {
    if (month < 0) {
      month += 12;
      this.#form.year.value = +this.#form.year.value - 1;
    }

    if (month > 11) {
      month -= 12;
      this.#form.year.value = +this.#form.year.value + 1;
    }

    this.#form.month.value = month;
  }
}
