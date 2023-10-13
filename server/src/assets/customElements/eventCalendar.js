import Calendar from '@event-calendar/core';
import DayGrid from '@event-calendar/day-grid';
import Interaction from '@event-calendar/interaction';
import { format, subDays } from 'date-fns';

export default class extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const events = JSON.parse(this.dataset.eventsJson);
    const addUrlTemplate = this.dataset.addUrlTemplate;

    this.classList.add('pc-eventcalendar');

    const goToEventCreate = (startDate, endDate) => {
      const url = addUrlTemplate
        .replace(':startDate', format(startDate, 'yyyy-MM-dd'))
        .replace(':endDate', format(endDate, 'yyyy-MM-dd'));

      window.location = url;
    };

    let ec = new Calendar({
      target: this,
      props: {
        plugins: [DayGrid, Interaction],
        options: {
          view: 'dayGridMonth',
          events,
          locale: 'fr',
          hiddenDays: [
            6, // Saturday
            0 // Sunday
          ],
          date: this.dataset.date,
          headerToolbar: { start: '', center: '', end: '' },
          dayMaxEvents: true,
          eventStartEditable: false,
          eventDurationEditable: false,
          eventContent: ({ event }) => {
            const url = event.extendedProps.url;
            if (url) {
              return { html: `<a href="${url}">${event.title}</a>` };
            }
            return event.title;
          },
          dateClick: info => goToEventCreate(info.date, info.date),
          selectable: true,
          selectBackgroundColor: 'var(--background-action-violet)',
          select: info => {
            // By default, range will stay selected if navigating using the
            // back button.
            ec.unselect();

            goToEventCreate(info.start, subDays(info.end, 1));
          }
        }
      }
    });
  }
}
