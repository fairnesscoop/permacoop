export default class extends HTMLButtonElement {
  connectedCallback() {
    /** @type {HTMLUListElement} */
    const linksList = document.getElementById(
      this.getAttribute('aria-controls')
    );

    let open = this.getAttribute('aria-expanded') === 'true' || false;

    this.addEventListener('click', () => {
      open = !open;
      this.setAttribute('aria-expanded', open);
      linksList.hidden = !open;
    });
  }
}
