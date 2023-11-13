import { onParsed } from '../lib/customElements';

export default class extends HTMLFormElement {
  connectedCallback() {
    onParsed(() => {
      this.previousBtn.addEventListener('click', () => {
        this.month.value = this._clipMonth(+this.month.value - 1);
        this.requestSubmit();
      });

      this.todayBtn.addEventListener('click', () => {
        const today = new Date();
        this.month.value = today.getMonth();
        this.year.value = today.getFullYear();
        this.requestSubmit();
      });

      this.nextBtn.addEventListener('click', () => {
        this.month.value = this._clipMonth(+this.month.value + 1);
        this.requestSubmit();
      });

      this.month.addEventListener('change', () => {
        this.requestSubmit();
      });

      this.year.addEventListener('change', () => {
        this.requestSubmit();
      });

      this.userId.addEventListener('change', () => {
        this.requestSubmit();
      });
    });
  }

  _clipMonth(month) {
    if (month < 0) {
      month += 12;

      const newYear = +this.year.value - 1;

      if (newYear < +this.minYear.value) {
        this.year.options.add(new Option(newYear, newYear), 0);
        this.minYear.value = newYear;
      }

      this.year.value = newYear;
    }

    if (month > 11) {
      month -= 12;

      const newYear = +this.year.value + 1;

      if (newYear > +this.maxYear.value) {
        this.year.options.add(new Option(newYear, newYear));
        this.maxYear.value = newYear;
      }

      this.year.value = newYear;
    }

    return month;
  }
}
