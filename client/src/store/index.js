import { writable } from 'svelte/store';

export const settings = writable({
  theme: ''
});

export const useLocalStorage = (key, store) => {
  const current_value = localStorage.getItem(key);

  if (current_value) {
    store.set(JSON.parse(current_value));
  }

  store.subscribe(value => {
    localStorage.setItem(key, JSON.stringify(value));
  });
};
