import { init, addMessages } from 'svelte-i18n';
import fr from '../i18n/fr.json';

addMessages('fr', fr);

init({
  fallbackLocale: 'fr',
  initialLocale: 'fr',
});
