// @ts-check
import { createCookie } from '../lib/cookie';

export default class extends HTMLButtonElement {
  connectedCallback() {
    let theme = document.documentElement.dataset.theme;

    if (!theme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
        .matches;
      theme = prefersDark ? 'dark' : 'light';
      this._storeTheme(theme);
    }

    this.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      this._storeTheme(theme);
    });
  }

  /**
   * @param {string} theme
   */
  _storeTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // Store in a cookie so the server sets <html data-theme> next time.
    // This will avoid FLOUC (Flashlight of unstyled content) when dark mode is used.
    createCookie('theme', theme);
  }
}
