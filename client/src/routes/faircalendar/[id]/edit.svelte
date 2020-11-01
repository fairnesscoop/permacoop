<script context="module">
  import {get, put, del} from '../../../utils/axios';

  export const preload = async ({params}, {user}) => {
    const {data: event} = await get(`events/${params.id}`);

    return {
      event
    };
  };
</script>

<script>
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import { format } from 'date-fns';
  import { _ } from 'svelte-i18n';
  import { fr } from 'date-fns/locale';
  import { goto } from '@sapper/app';
  import Form from '../_Form.svelte';
  import { errorNormalizer } from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import H4Title from '../../../components/H4Title.svelte';

  export let event;

  const taskId = event.task ? event.task.id : null;
  const projectId = event.project ? event.project.id : null;
  const time = String(event.time);

  let errors = [];
  let loading = false;
  let title = $_('faircalendar.from_date', { values: { date: format(new Date(event.date), 'EE dd MMMM', { locale: fr } ) } });

  const onSave = async e => {
    try {
      loading = true;
      await put(`events/${event.id}`, e.detail);
      goto(`/faircalendar?date=${event.date}`);
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };

  const onDelete = async () => {
    try {
      loading = true;
      await del(`events/${event.id}`);
      goto('/faircalendar');
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items={[{title: $_('faircalendar.breadcrumb'), path: 'faircalendar'}, {title}]} />
<ServerErrors {errors} />
<div class="inline-flex items-center">
  <H4Title {title} />
  <button disable={loading} class="py-1 px-2 ml-2 mb-6 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-purple" type="button" on:click={onDelete}>
    {$_('common.form.remove')}
  </button>
</div>
<Form on:save={onSave} event={{...event, taskId, projectId, time}} {loading} />
