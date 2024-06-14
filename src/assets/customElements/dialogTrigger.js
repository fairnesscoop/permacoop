// @ts-check

customElements.define(
  'pc-dialog-trigger',
  class extends HTMLElement {
    connectedCallback() {
      const dialogId = this.getAttribute('dialog');

      if (!dialogId) {
        throw new Error('"dialog" attribute is required');
      }

      const dialog = /** @type {HTMLDialogElement|null} */ (document.getElementById(
        dialogId
      ));

      if (!dialog) {
        throw new Error(`element "${dialogId}" does not exist`);
      }

      const button = this.querySelector('button');

      if (!button) {
        return;
      }

      const submitValue = this.getAttribute('submitValue') || 'submit';

      button.addEventListener('click', event => {
        event.preventDefault();
        dialog.showModal();
      });

      dialog.addEventListener('close', () => {
        if (dialog.returnValue === submitValue) {
          this.dispatchEvent(
            new CustomEvent('dialog-trigger:submit', { bubbles: true })
          );
        }
      });
    }
  }
);
