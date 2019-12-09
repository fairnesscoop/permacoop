import Cookies from 'js-cookie';

export const TOKEN_KEY = 'cooperp_token';

export class TokenStorage {
  static save = (token: string): void => {
    Cookies.set(TOKEN_KEY, token, {
      secure: process.env.NODE_ENV === 'production'
    });
  };

  static get = (): string | undefined => Cookies.get(TOKEN_KEY);

  static remove = (): void => Cookies.remove(TOKEN_KEY);
}
