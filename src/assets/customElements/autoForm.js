import { onParsed } from '../lib/customElements';

export default class extends HTMLFormElement {
  connectedCallback() {
    onParsed(() => {
      for (const formControl of this) {
        formControl.addEventListener('change', () => this.requestSubmit());
      }
    });
  }
}
