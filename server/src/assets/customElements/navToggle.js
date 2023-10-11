export default class extends HTMLButtonElement {
  connectedCallback() {
    /** @type {HTMLElement} */
    this._nav = document.getElementById('pc-nav-toggle-menu');

    this._open = false;
    this._sync();

    this.addEventListener('click', () => {
      this._open = !this._open;
      this._sync();
    });
  }

  _sync() {
    if (this._open) {
      this._nav.classList.add('pc-nav--open');
      this.setAttribute('aria-expanded', true);
    } else {
      this._nav.classList.remove('pc-nav--open');
      this.removeAttribute('aria-expanded');
    }
  }
}
