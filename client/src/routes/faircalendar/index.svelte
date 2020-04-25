<script context="module">
  export const preload = ({query}) => {
    return {
      filters: {
        date: query.date ? new Date(query.date) : new Date(),
        userId: query.userId ? query.userId : null
      }
    };
  };
</script>

<script>
  import {onMount} from 'svelte';
  import {goto} from '@sapper/app';
  import frLocale from '@fullcalendar/core/locales/fr';
  import '@fullcalendar/core/main.css';
  import '@fullcalendar/daygrid/main.css';
  import {user} from '../../store';
  import {client as axios} from '../../utils/axios';
  import Filters from './_Filters.svelte';
  import Overview from './_Overview.svelte';
  import {errorNormalizer} from '../../normalizer/errors';
  import Breadcrumb from '../_components/Breadcrumb.svelte';
  import Loader from '../_components/Loader.svelte';
  import ServerErrors from '../_components/ServerErrors.svelte';
  import SecuredView from '../_components/SecuredView.svelte';

  export let filters;

  let loading = false;
  let isLoggedUser = false;
  let errors = [];
  let data = {};

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
      header: {left: 'title', center: '', right: ''},
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

  const fetchEvents = async params => {
    try {
      loading = true;
      isLoggedUser = params.userId === $user.id;
      ({data} = await axios.get('events', {params}));
      fullCalendar(data.events, params.date);
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };

  onMount(async () => {
    if (!filters.userId) {
      filters.userId = $user.id;
    }

    fetchEvents(filters);
  });

  const onFilter = e => {
    fetchEvents(e.detail);
  };
</script>

<svelte:head>
  <title>Permacoop - FairCalendar</title>
</svelte:head>

<SecuredView roles={['cooperator', 'employee']}>
  <div class="col-md-12">
    <Breadcrumb items={[{title: 'FairCalendar'}]} />
    <ServerErrors {errors} />
    <Filters {...filters} on:filter={onFilter} />
    <Loader {loading} />
    <div id="calendar" />
    <div class="mb-1 mt-2">
      <span class="badge badge-success">Mission</span>
      <span class="badge badge-secondary">Support // Podcast</span>
      <span class="badge badge-info">Dojo</span>
      <span class="badge badge-warning">Formation // Conf // Meetup</span>
      <span class="badge badge-primary">Vacances</span>
      <span class="badge badge-danger">Congé maladie</span>
      <span class="badge badge-dark">Autres</span>
    </div>
    {#if data.overview}
      <Overview overview={data.overview} />
    {/if}
  </div>
</SecuredView>
