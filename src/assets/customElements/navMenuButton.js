// @ts-check

export default class extends HTMLElement {
  connectedCallback() {
    const btn = /** @type {HTMLButtonElement} */ (this.querySelector('button'));

    const ariaControls = btn.getAttribute('aria-controls');

    if (!ariaControls) {
      throw new Error('aria-controls is missing');
    }

    const linksList = /** @type {HTMLUListElement} */ (document.getElementById(
      ariaControls
    ));

    let open = btn.getAttribute('aria-expanded') === 'true' || false;

    btn.addEventListener('click', () => {
      open = !open;
      btn.setAttribute('aria-expanded', open.toString());
      linksList.hidden = !open;
    });
  }
}
