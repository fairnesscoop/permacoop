// @ts-check
import autoForm from './autoForm';
import clipboardButton from './clipboardButton';
import eventForm from './eventForm';
import fairCalendarFiltersForm from './fairCalendarFiltersForm';
import navMenuButton from './navMenuButton';
import themeToggler from './themeToggler';

customElements.define('pc-auto-form', autoForm);
customElements.define('pc-clipboard-button', clipboardButton);
customElements.define('pc-event-form', eventForm, { extends: 'form' });
customElements.define('pc-faircalendar-filters-form', fairCalendarFiltersForm);
customElements.define('pc-nav-menu-button', navMenuButton, {
  extends: 'button'
});
customElements.define('pc-theme-toggler', themeToggler, { extends: 'button' });
