import { buildFormFetchUrl, visit } from '../lib/turbolite';

export default class extends HTMLFormElement {
  connectedCallback() {
    const clipMonth = month => {
      if (month < 0) {
        month += 12;

        const newYear = +this.year.value - 1;

        if (newYear < +this.minYear.value) {
          this.year.options.add(new Option(newYear, newYear));
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
    };

    const doSubmit = async () => {
      const url = buildFormFetchUrl(this);
      await visit(url, {
        targets: [this.dataset.titleTarget, this.dataset.calendarTarget]
      });
    };

    this.previousBtn.addEventListener('click', () => {
      this.month.value = clipMonth(+this.month.value - 1);
      doSubmit();
    });

    this.todayBtn.addEventListener('click', () => {
      const today = new Date();
      this.month.value = today.getMonth();
      this.year.value = today.getFullYear();
      doSubmit();
    });

    this.nextBtn.addEventListener('click', () => {
      this.month.value = clipMonth(+this.month.value + 1);
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
  }
}
