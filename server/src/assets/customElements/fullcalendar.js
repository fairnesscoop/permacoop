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

    const calendar = new Calendar(this, {
      plugins: [interactionPlugin, dayGridPlugin],
      initialView: 'dayGridMonth',
      locale: 'fr',
      nowIndicator: true,
      selectable: true,
      weekends: false,
      height: 700,
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

    calendar.render();
  }
}
