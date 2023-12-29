// @ts-check
import Frame from '../lib/frame';

export default class extends HTMLElement {
  connectedCallback() {
    const form = this.querySelector('form');

    if (!form) {
      return;
    }

    form.addEventListener('submit', event => {
      event.preventDefault();

      const url = new URL(form.action);

      new FormData(form).forEach((value, key) => {
        url.searchParams.set(key, value.toString());
      });

      Frame.triggerVisit(this, url.toString());
    });
  }
}
