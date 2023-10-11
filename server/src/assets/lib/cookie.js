// Adapted from: http://www.quirksmode.org/js/cookies.html

export function createCookie(name, value) {
  document.cookie = name + '=' + value + '; SameSite=Strict; path=/';
}
