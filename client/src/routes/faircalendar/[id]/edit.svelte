<script context="module">
  import { get, put, del } from '../../../utils/axios';

  export const preload = async ({ params }, { user }) => {
    const token = user.apiToken;
    const { data: event } = await get(`events/${params.id}`, {}, token);

    return {
      event,
      token,
    };
  };
</script>

<script>
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import { format } from 'date-fns';
  import { fr } from 'date-fns/locale';
  import { goto } from '@sapper/app';
  import Form from '../_Form.svelte';
  import { errorNormalizer } from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';

  export let event;
  export let token;

  const taskId = event.task ? event.task.id : null;
  const projectId = event.project ? event.project.id : null;
  const time = String(event.time);

  let errors = [];
  let title = `Edition du ${format(new Date(event.date), 'EEEE dd MMMM yyyy', {
    locale: fr,
  })}`;

  const onSave = async (e) => {
    try {
      await put(`events/${event.id}`, e.detail, token);

      goto('/faircalendar');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };

  const onDelete = async () => {
    try {
      await del(`events/${event.id}`, token);

      goto('/faircalendar');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>{title} - Permacoop</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb
    items="{[{ title: 'FairCalendar', path: 'faircalendar' }, { title }]}" />
  <ServerErrors errors="{errors}" />
  <Form on:save="{onSave}" event="{{ ...event, taskId, projectId, time }}">
    <button class="btn btn-danger" type="button" on:click="{onDelete}">
      Supprimer
    </button>
  </Form>
</div>
