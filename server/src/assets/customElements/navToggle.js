export default class extends HTMLButtonElement {
  connectedCallback() {
    /** @type {HTMLElement} */
    const nav = document.querySelector('[data-nav-toggle-target="nav"]');

    this.addEventListener('click', () => {
      nav.classList.toggle('pc-nav-open');
    });
  }
}
