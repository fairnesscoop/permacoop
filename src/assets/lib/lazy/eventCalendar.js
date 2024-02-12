import { subDays } from 'date-fns';
import Calendar from '@event-calendar/core';
import DayGrid from '@event-calendar/day-grid';
import Interaction from '@event-calendar/interaction';

/**
 * @param {HTMLElement} target
 * @param {string} date
 * @param {any[]} events
 * @param {(startDate: Date, endDate: Date) => void} goToEventCreate
 */
export function createCalendar(target, date, events, goToEventCreate) {
  const ec = new Calendar({
    target,
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
        date,
        headerToolbar: { start: '', center: '', end: '' },
        dayMaxEvents: true,
        eventStartEditable: false,
        eventDurationEditable: false,
        // TODO: add testid on days
        eventContent: ({ event }) => {
          const { url, summary } = event.extendedProps;

          if (url) {
            return {
              html: `<a href="${url}" ${
                summary ? 'title="' + summary + '"' : ''
              }>${event.title}</a>`
            };
          }

          if (summary) {
            return {
              html: `<span title="${summary}">${event.title}</span>`
            };
          }

          return event.title;
        },
        dateClick: ({ event, date }) => {
          goToEventCreate(date, date);
        },
        selectable: true,
        selectBackgroundColor: 'var(--background-action-violet)',
        select: ({ start, end }) => {
          // By default, range will stay selected if navigating using the back button.
          ec.unselect();

          goToEventCreate(start, subDays(end, 1));
        }
      }
    }
  });
}
