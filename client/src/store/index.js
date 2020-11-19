import { writable } from 'svelte/store';

export const settings = writable({
  theme: '',
  openMobileMenu: false
});

export const useLocalStorage = (key, store) => {
  const currentValue = localStorage.getItem(key);

  if (currentValue) {
    store.set(JSON.parse(currentValue));
  }

  store.subscribe((value) => {
    localStorage.setItem(key, JSON.stringify(value));
  });
};
