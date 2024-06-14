// @ts-check

customElements.define(
  'pc-form-submit',
  class extends HTMLElement {
    connectedCallback() {
      const form = this.querySelector('form');

      if (!form) {
        console.warn('<form> element not found');
        return;
      }

      const eventName = this.getAttribute('on') || 'form:request-submit';

      this.addEventListener(eventName, () => {
        console.log('submit');
        form.requestSubmit();
      });
    }
  }
);
