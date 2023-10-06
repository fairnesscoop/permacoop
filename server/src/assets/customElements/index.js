import fullcalendar from './fullcalendar';
import blobLink from './blobLink';
import clipboard from './clipboard';
import fairCalendarFiltersForm from './fairCalendarFiltersForm';
import navToggle from './navToggle';

customElements.define('pc-fullcalendar', fullcalendar);
customElements.define('pc-blob-link', blobLink, { extends: 'a' });
customElements.define('pc-clipboard', clipboard, { extends: 'button' });
customElements.define('pc-faircalendar-filters-form', fairCalendarFiltersForm, {
  extends: 'form'
});
customElements.define('pc-nav-toggle', navToggle, { extends: 'button' });
