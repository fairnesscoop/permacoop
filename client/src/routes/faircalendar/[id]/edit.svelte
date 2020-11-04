<script context="module">
  export const preload = async ({ params: { id } }) => {
    return { id };
  };
</script>

<script>
  import { onMount } from 'svelte';
  import { format } from 'date-fns';
  import { _ } from 'svelte-i18n';
  import { fr } from 'date-fns/locale';
  import { goto } from '@sapper/app';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import { get, put, del } from '../../../utils/axios';
  import Form from '../_Form.svelte';
  import { errorNormalizer } from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import H4Title from '../../../components/H4Title.svelte';

  export let id;

  let taskId;
  let projectId;
  let time;
  let errors = [];
  let loading = false;
  let title = '';
  let event;

  onMount(async () => {
    try {
      ({ data: event } = await get(`events/${id}`));
      title = $_('faircalendar.from_date', {
        values: {
          date: format(new Date(event.date), 'EE dd MMMM', { locale: fr }),
        },
      });
      taskId = event.task ? event.task.id : null;
      projectId = event.project ? event.project.id : null;
      time = String(event.time);
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });

  const onSave = async (e) => {
    try {
      loading = true;
      await put(`events/${id}`, e.detail);
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
      await del(`events/${id}`);
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

<Breadcrumb
  items="{[{ title: $_('faircalendar.breadcrumb'), path: 'faircalendar' }, { title }]}" />
<ServerErrors errors="{errors}" />
<div class="inline-flex items-center">
  <H4Title title="{title}" />
  {#if event}
    <button
      disable="{loading}"
      class="py-1 px-2 ml-2 mb-6 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-purple"
      type="button"
      on:click="{onDelete}">
      {$_('common.form.remove')}
    </button>
  {/if}
</div>
{#if event}
  <Form
    on:save="{onSave}"
    event="{{ ...event, taskId, projectId, time }}"
    loading="{loading}" />
{/if}
