<script context="module">
  import {get, put, del} from '../../../utils/axios';

  export const preload = async ({params}, {user}) => {
    const token = user.apiToken;
    const {data: event} = await get(`events/${params.id}`, {}, token);

    return {
      event, 
      token
    };
  };
</script>

<script>
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import {format} from 'date-fns';
  import {fr} from 'date-fns/locale';
  import {goto} from '@sapper/app';
  import Form from '../_Form.svelte';
  import {errorNormalizer} from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import H4Title from '../../../components/H4Title.svelte';

  export let event;
  export let token;

  const taskId = event.task ? event.task.id : null;
  const projectId = event.project ? event.project.id : null;
  const time = String(event.time);

  let errors = [];
  let loading = false;
  let title = `Activité du ${format(new Date(event.date), 'EEEE dd MMMM yyyy', { locale: fr } )}`;

  const onSave = async e => {
    try {
      loading = true;
      await put(`events/${event.id}`, e.detail, token);
      goto('/faircalendar');
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };

  const onDelete = async () => {
    try {
      loading = true;
      await del(`events/${event.id}`, token);
      goto('/faircalendar');
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>{title} - Permacoop</title>
</svelte:head>

<Breadcrumb items={[{title: 'FairCalendar', path: 'faircalendar'}, {title}]} />
<ServerErrors {errors} />
<div class="inline-flex items-center">
  <H4Title {title} />
  <button disable={loading} class="py-1 px-2 ml-2 mb-6 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-purple" type="button" on:click={onDelete}>
    Supprimer
  </button>
</div>
<Form on:save={onSave} event={{...event, taskId, projectId, time}} {loading} />
