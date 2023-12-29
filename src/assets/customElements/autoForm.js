// @ts-check
import { onParsed } from '../lib/customElements';

export default class extends HTMLElement {
  connectedCallback() {
    onParsed(() => {
      // Progressive enhancement:
      // If this custom element activates, submit the form whenever
      // a form control changes value.

      const form = /** @type {HTMLFormElement} */ (this.querySelector('form'));

      for (const formControl of form.elements) {
        formControl.addEventListener('change', () => form.requestSubmit());
      }
    });
  }
}
