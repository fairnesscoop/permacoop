import { Controller } from '@hotwired/stimulus';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';

export default class extends Controller {
    static values = {
        eventsJson: String,
        addUrlTemplate: String,
    };

    connect() {
        const calendar = new Calendar(this.element, {
            plugins: [ interactionPlugin, dayGridPlugin ],
            initialView: 'dayGridMonth',
            locale: 'fr',
            nowIndicator: true,
            selectable: true,
            weekends: false,
            height: 700,
            dayHeaderFormat: { weekday: 'long' },
            events: JSON.parse(this.eventsJsonValue),
            select: (info) => {
                const year = info.start.getFullYear();
                const month = (info.start.getMonth() + 1).toString().padStart(2, '0');
                const day = (info.start.getDate()).toString().padStart(2, '0');
                const url = this.addUrlTemplateValue.replace('__date__', `${year}-${month}-${day}`);
                window.location = url;
            }
        });

        calendar.render();
    }
}
