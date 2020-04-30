import {writable} from 'svelte/store';

export const user = writable(null);
export const useLocalStorage = () => {
  const key = 'persist:user';
  const current_value = localStorage.getItem(key);

  if (current_value) {
    user.set(JSON.parse(current_value));
  }

  user.subscribe((value) => {
    localStorage.setItem(key, JSON.stringify(value));
  });
};
