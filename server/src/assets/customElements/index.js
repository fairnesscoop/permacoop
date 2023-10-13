import blobLink from './blobLink';
import clipboardButton from './clipboardButton';
import eventForm from './eventForm';
import fairCalendarFiltersForm from './fairCalendarFiltersForm';
import navMenuButton from './navMenuButton';
import themeToggler from './themeToggler';

customElements.define('pc-blob-link', blobLink, { extends: 'a' });
customElements.define('pc-clipboard-button', clipboardButton, {
  extends: 'button'
});
customElements.define('pc-event-form', eventForm, { extends: 'form' });
customElements.define('pc-faircalendar-filters-form', fairCalendarFiltersForm, {
  extends: 'form'
});
customElements.define('pc-nav-menu-button', navMenuButton, {
  extends: 'button'
});
customElements.define('pc-theme-toggler', themeToggler, { extends: 'button' });
