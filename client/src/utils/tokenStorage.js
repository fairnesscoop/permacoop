import Cookies from 'js-cookie';

export const TOKEN_KEY = 'permacoop_token';

export class TokenStorage {
  static save(token) {
    Cookies.set(TOKEN_KEY, token, {
      secure: process.env.NODE_ENV === 'production'
    });
  }

  static get() {
    return Cookies.get(TOKEN_KEY);
  }

  static remove() {
    Cookies.remove(TOKEN_KEY);
  }
}
