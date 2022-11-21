import { writable, type Writable } from "svelte/store";

export const settings = writable({
  theme: "",
  openMobileMenu: false,
});

export const useLocalStorage = <T>(key: string, store: Writable<T>) => {
  const currentValue = localStorage.getItem(key);

  if (currentValue) {
    store.set(JSON.parse(currentValue));
  }

  store.subscribe((value) => {
    localStorage.setItem(key, JSON.stringify(value));
  });
};
