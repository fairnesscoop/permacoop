import { onParsed } from '../lib/customElements';
import { boostLinks } from '../lib/turbolite';

export default class extends HTMLElement {
  connectedCallback() {
    onParsed(() => {
      boostLinks(this);
    });
  }
}
