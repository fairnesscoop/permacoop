import fullcalendar from './fullcalendar';
import blobLink from './blobLink';
import clipboardButton from './clipboardButton';
import fairCalendarFiltersForm from './fairCalendarFiltersForm';
import navToggle from './navToggle';

customElements.define('pc-fullcalendar', fullcalendar);
customElements.define('pc-blob-link', blobLink, { extends: 'a' });
customElements.define('pc-clipboard-button', clipboardButton, {
  extends: 'button'
});
customElements.define('pc-faircalendar-filters-form', fairCalendarFiltersForm, {
  extends: 'form'
});
customElements.define('pc-nav-toggle', navToggle, { extends: 'button' });
