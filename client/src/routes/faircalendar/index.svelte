<script context="module">
  export const preload = ({ query }, { user }) => {
    return {
      filters: {
        date: query.date ? new Date(query.date) : new Date(),
        userId: query.userId ? query.userId : null,
      },
      user,
    };
  };
</script>

<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { goto } from '@sapper/app';
  import { format, subDays } from 'date-fns';
  import { fr } from 'date-fns/locale';
  import frLocale from '@fullcalendar/core/locales/fr';
  import '@fullcalendar/core/main.css';
  import '@fullcalendar/daygrid/main.css';
  import { get } from '../../utils/axios';
  import Filters from './_Filters.svelte';
  import Overview from './_Overview.svelte';
  import { errorNormalizer } from '../../normalizer/errors';
  import Breadcrumb from '../../components/Breadcrumb.svelte';
  import H4Title from '../../components/H4Title.svelte';
  import ServerErrors from '../../components/ServerErrors.svelte';
  import { settings } from '../../store';
  import { minutesToHours } from '../../normalizer/time';

  export let filters;
  export let user;

  let isLoggedUser = false;
  let errors = [];
  let data = {};

  $: title = $_('faircalendar.title', {
    values: {
      month: format(new Date(filters.date), 'MMMM yyyy', { locale: fr }),
    },
  });

  const fullCalendar = async (events, date) => {
    const { Calendar } = await import('@fullcalendar/core');
    const { default: dayGridPlugin } = await import('@fullcalendar/daygrid');
    const { default: interactionPlugin } = await import(
      '@fullcalendar/interaction'
    );

    const dom = document.getElementById('calendar');
    dom.innerHTML = '';

    const calendar = new Calendar(dom, {
      locale: frLocale,
      plugins: [dayGridPlugin, interactionPlugin],
      nowIndicator: true,
      showNonCurrentDates: false,
      selectable: true,
      weekends: false,
      height: 620,
      eventLimit: true,
      header: { left: '', center: '', right: '' },
      columnHeaderFormat: { weekday: 'long' },
      events,
      select: (info) => {
        if (!isLoggedUser) {
          return;
        }

        const endDate = format(subDays(new Date(info.endStr), 1), 'yyyy-MM-dd');
        goto(`/faircalendar/${info.startStr}_${endDate}/add`);
      },
      eventDataTransform: (data) => {
        const { id, date, time, summary, type, task, billable, project } = data;
        let title = `${minutesToHours(time)}${false === billable && type === 'mission' ? '*': ''} - `;

        if ('mission' === type && task && project) {
          title += `${project.name} (${task.name})`;
        } else {
          title += $_(`faircalendar.type.${type}`);
        }

        data.title = title;
        if (isLoggedUser && id) {
          data.id = id;
          data.url = `faircalendar/${id}/edit`;
        }
        data.className =
          $settings.theme === 'theme-dark'
            ? `event-${type}--dark`
            : `event-${type}`;
        data.tip = summary;
      },
      businessHours: {
        daysOfWeek: [1, 2, 3, 4, 5],
      },
    });
    calendar.gotoDate(date);
    calendar.render();
  };

  const fetchEvents = async ({ userId, date }) => {
    try {
      isLoggedUser = userId === user.id;
      filters.date = date;
      filters.userId = userId;
      ({ data } = await get('faircalendar', { params: { userId, date } }));
      fullCalendar(data.events, date);
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };

  onMount(async () => {
    if (!filters.userId) {
      filters.userId = user.id;
    }

    fetchEvents(filters);
  });

  const onFilter = (e) => fetchEvents(e.detail);
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items="{[{ title: $_('faircalendar.breadcrumb') }]}" />
<ServerErrors errors="{errors}" />
<H4Title title="{title}" />
<Filters {...filters} on:filter="{onFilter}" />
{#if data.overview}
  <Overview overview="{data.overview}" />
{/if}

<div class="px-3 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <div id="calendar"></div>
  <small class="mt-2 mb-2 font-semibold dark:text-white">{$_('faircalendar.not_billable')}</small>
</div>
