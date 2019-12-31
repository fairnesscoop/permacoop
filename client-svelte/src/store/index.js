import {writable} from 'svelte/store';

export let user;

if (typeof window !== 'undefined') {
  user = writable(JSON.parse(localStorage.getItem('persist:erp_user')) || null);
  user.subscribe(user =>
    localStorage.setItem('persist:erp_user', JSON.stringify(user))
  );
} else {
  user = writable(null);
}
