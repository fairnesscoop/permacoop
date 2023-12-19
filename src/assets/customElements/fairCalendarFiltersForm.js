// @ts-check
import { onParsed } from '../lib/customElements';

export default class extends HTMLFormElement {
  connectedCallback() {
    onParsed(() => {
      this.previousBtn.addEventListener('click', () => {
        this.month.value = this._clipMonth(+this.month.value - 1);
        this._submit();
      });

      this.todayBtn.addEventListener('click', () => {
        const today = new Date();
        this.month.value = today.getMonth();
        this.year.value = today.getFullYear();
        this._submit();
      });

      this.nextBtn.addEventListener('click', () => {
        this.month.value = this._clipMonth(+this.month.value + 1);
        this._submit();
      });

      this.month.addEventListener('change', () => {
        this._submit();
      });

      this.year.addEventListener('change', () => {
        this._submit();
      });

      this.userId.addEventListener('change', () => {
        this._submit();
      });
    });
  }

  _submit() {
    this.requestSubmit();
  }

  _clipMonth(month) {
    if (month < 0) {
      month += 12;
      this.year.value = +this.year.value - 1;
    }

    if (month > 11) {
      month -= 12;
      this.year.value = +this.year.value + 1;
    }

    return month;
  }
}
