// @ts-check
// Adapted from: http://www.quirksmode.org/js/cookies.html

/**
 * @param {string} name
 * @param {string} value
 */
export function createCookie(name, value) {
  document.cookie = name + '=' + value + '; SameSite=Strict; path=/';
}

/**
 * @param {string} name
 */
export function removeCookie(name) {
  document.cookie = name + '=; SameSite=Strict; path=/';
}
