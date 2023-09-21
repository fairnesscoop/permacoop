import './styles/main.css';

import { Application } from '@hotwired/stimulus';

import FullCalendarController from './controllers/fullcalendar_controller';

const Stimulus = Application.start();
Stimulus.debug = true;

Stimulus.register('fullcalendar', FullCalendarController);
