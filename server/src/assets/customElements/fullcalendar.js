import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';

export default class extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const events = JSON.parse(this.dataset.eventsJson);
    const addUrlTemplate = this.dataset.addUrlTemplate;

    // TODO: drag and drop select multiple days

    const calendar = new Calendar(this, {
      plugins: [interactionPlugin, dayGridPlugin],
      initialView: 'dayGridMonth',
      locale: 'fr',
      nowIndicator: true,
      showNonCurrentDates: false,
      selectable: true,
      weekends: false,
      height: this.dataset.height,
      headerToolbar: false,
      dayHeaderFormat: { weekday: 'long' },
      events,
      select: info => {
        const year = info.start.getFullYear();
        const month = (info.start.getMonth() + 1).toString().padStart(2, '0');
        const day = info.start
          .getDate()
          .toString()
          .padStart(2, '0');

        const url = addUrlTemplate.replace(
          '__date__',
          `${year}-${month}-${day}`
        );

        window.location = url;
      }
    });

    calendar.gotoDate(this.dataset.date);

    calendar.render();
  }
}
