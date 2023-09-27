import fullcalendar from './fullcalendar';
import blobLink from './blobLink';

customElements.define('pc-fullcalendar', fullcalendar);
customElements.define('pc-blob-link', blobLink, { extends: 'a' });
