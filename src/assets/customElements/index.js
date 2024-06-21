// @ts-check
import autoForm from './autoForm';
import clipboardButton from './clipboardButton';
import eventCalendar from './eventCalendar';
import eventForm from './eventForm';
import frame from './frame';
import frameForm from './frameForm';
import monthNavigator from './monthNavigator';
import navMenuButton from './navMenuButton';
import themeToggler from './themeToggler';
import './dialogTrigger';
import './formSubmit';

customElements.define('pc-auto-form', autoForm);
customElements.define('pc-clipboard-button', clipboardButton);
customElements.define('pc-eventcalendar', eventCalendar);
customElements.define('pc-event-form', eventForm);
customElements.define('pc-frame', frame);
customElements.define('pc-frame-form', frameForm);
customElements.define('pc-month-navigator', monthNavigator);
customElements.define('pc-nav-menu-button', navMenuButton);
customElements.define('pc-theme-toggler', themeToggler);
