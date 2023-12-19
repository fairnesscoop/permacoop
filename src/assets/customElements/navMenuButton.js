// @ts-check

export default class extends HTMLButtonElement {
  connectedCallback() {
    const ariaControls = this.getAttribute('aria-controls');

    if (!ariaControls) {
      throw new Error('aria-controls is missing');
    }

    const linksList = /** @type {HTMLUListElement} */ (document.getElementById(
      ariaControls
    ));

    let open = this.getAttribute('aria-expanded') === 'true' || false;

    this.addEventListener('click', () => {
      open = !open;
      this.setAttribute('aria-expanded', open.toString());
      linksList.hidden = !open;
    });
  }
}
