import { onParsed } from '../lib/customElements';
import { buildFormFetchUrl, visit } from '../lib/turbolite';

export default class extends HTMLFormElement {
  connectedCallback() {
    onParsed(() => {
      const doSubmit = async () => {
        const url = buildFormFetchUrl(this);
        await visit(url, { select: this.dataset.select });
      };

      this.previousBtn.addEventListener('click', () => {
        this.month.value = this._clipMonth(+this.month.value - 1);
        doSubmit();
      });

      this.todayBtn.addEventListener('click', () => {
        const today = new Date();
        this.month.value = today.getMonth();
        this.year.value = today.getFullYear();
        doSubmit();
      });

      this.nextBtn.addEventListener('click', () => {
        this.month.value = this._clipMonth(+this.month.value + 1);
        doSubmit();
      });

      this.month.addEventListener('change', () => {
        doSubmit();
      });

      this.year.addEventListener('change', () => {
        doSubmit();
      });

      this.userId.addEventListener('change', () => {
        doSubmit();
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
