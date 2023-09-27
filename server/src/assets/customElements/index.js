import fullcalendar from './fullcalendar';
import blobLink from './blobLink';
import clipboard from './clipboard';

customElements.define('pc-fullcalendar', fullcalendar);
customElements.define('pc-blob-link', blobLink, { extends: 'a' });
customElements.define('pc-clipboard', clipboard, { extends: 'button' });
