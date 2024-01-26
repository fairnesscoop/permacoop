// import morphdom from 'morphdom';
import Frame from '../lib/frame';

export default class extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute('id');

    if (id === null) {
      throw new Error('<pc-frame> must have an id attribute');
    }

    Frame.listenVisits(id);
  }
}
