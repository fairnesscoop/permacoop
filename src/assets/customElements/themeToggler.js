// @ts-check
import { createCookie, removeCookie } from '../lib/cookie';

export default class extends HTMLElement {
  connectedCallback() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    let theme = document.documentElement.dataset.theme || null; // Comes from the cookie

    // Theme coming from the cookie has priority, use system default as a fallback.
    if (!theme) {
      theme = prefersDark.matches ? 'dark' : 'light';
    }

    // Use new system default whenever it changes, until the user toggle the theme again.
    prefersDark.addEventListener('change', () => {
      theme = prefersDark.matches ? 'dark' : 'light';
      this._clearStoredTheme();
    });

    // Toggle theme when user clicks on the button.
    const toggleBtn = /** @type {HTMLButtonElement} */ (this.querySelector(
      'button'
    ));
    toggleBtn.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      this._storeTheme(theme);
    });
  }

  /**
   * @param {string} theme
   */
  _storeTheme(theme) {
    document.documentElement.dataset.theme = theme;
    // Store in a cookie so the server sets <html data-theme> next time.
    // This will avoid FOUC (flash of unstyled content) when dark mode is used.
    createCookie('theme', theme);
  }

  _clearStoredTheme() {
    delete document.documentElement.dataset.theme;
    removeCookie('theme');
  }
}
