import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { format, subDays } from 'date-fns';

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
      showNonCurrentDates: false,
      selectable: true,
      weekends: false,
      height: this.dataset.height,
      headerToolbar: false,
      dayHeaderFormat: { weekday: 'long' },
      events,
      select: info => {
        const startDate = format(info.start, 'yyyy-MM-dd');
        const endDate = format(subDays(info.end, 1), 'yyyy-MM-dd');

        const url = addUrlTemplate
          .replace(':startDate', startDate)
          .replace(':endDate', endDate);

        window.location = url;
      }
    });

    calendar.gotoDate(this.dataset.date);

    calendar.render();
  }
}
