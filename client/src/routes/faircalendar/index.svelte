<script context="module">
  export const preload = ({query}, {user}) => {
    return {
      filters: {
        date: query.date ? new Date(query.date) : new Date(),
        userId: query.userId ? query.userId : null
      },
      user
    };
  };
</script>

<script>
  import { onMount } from 'svelte';
  import { goto } from '@sapper/app';
  import { format } from 'date-fns';
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

  export let filters;
  export let user;

  let isLoggedUser = false;
  let errors = [];
  let data = {};
  $: title = `FairCalendar ${format(new Date(filters.date), 'MMMM yyyy', { locale: fr } )}`;

  const fullCalendar = async (events, date) => {
    const {Calendar} = await import('@fullcalendar/core');
    const {default: dayGridPlugin} = await import('@fullcalendar/daygrid');
    const {default: interactionPlugin} = await import(
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
      height: 620,
      header: {left: '', center: '', right: ''},
      columnHeaderFormat: {weekday: 'long'},
      events,
      dateClick: info => {
        if (!isLoggedUser) {
          return;
        }

        goto(`/faircalendar/${info.dateStr}/add`);
      },
      eventDataTransform: data => {
        const {id, date, time, summary, type, task, project} = data;
        let title = time < 1 ? `[${time}] ` : '';

        if ('mission' === type && task && project) {
          title += `${project.name} (${task.name})`;
        } else {
          title += type;
        }

        data.id = id;
        data.title = title;
        if (isLoggedUser) {
          data.url = `faircalendar/${id}/edit`;
        }
        data.className = `event-${type}`;
        data.tip = summary;
      },
      businessHours: {
        daysOfWeek: [1, 2, 3, 4, 5]
      }
    });
    calendar.gotoDate(date);
    calendar.render();
  };

  const fetchEvents = async ({userId, date}) => {
    try {
      isLoggedUser = userId === user.id;
      filters.date = date;
      filters.userId = userId;
      ({data} = await get('events', {params: {userId, date}}));
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

  const onFilter = e => fetchEvents(e.detail);
</script>

<svelte:head>
  <title>{title} - Permacoop</title>
</svelte:head>

<Breadcrumb items={[{title}]} />
<ServerErrors {errors} />
<H4Title {title} />
<Filters {...filters} on:filter={onFilter} />
{#if data.overview}
  <Overview overview={data.overview} />
{/if}
<div id="calendar" />
