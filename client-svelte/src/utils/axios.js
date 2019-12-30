import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    Authorization:
      'Bearer $argon2i$v=19$m=4096,t=3,p=1$uiud0xlZ9c8x1Vh0oJ3fkg$shVNFaCnL+N1octyJ1Iy01WgxOzsHSbvRyI9p8jRb0g'
  }
});
