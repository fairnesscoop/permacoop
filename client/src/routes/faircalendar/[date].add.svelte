<script context="module">
  export const preload = ({ params }, { user }) => {
    return { date: params.date, token: user.apiToken };
  };
</script>

<script>
  import { goto } from '@sapper/app';
  import { format } from 'date-fns';
  import { fr } from 'date-fns/locale';
  import Breadcrumb from '../../components/Breadcrumb.svelte';
  import { post } from '../../utils/axios';
  import Form from './_Form.svelte';
  import { errorNormalizer } from '../../normalizer/errors';
  import ServerErrors from '../../components/ServerErrors.svelte';

  export let token;
  export let date;

  let pageTitle = `Ajout d'activité du ${format(
    new Date(date),
    'EEEE dd MMMM yyyy',
    {
      locale: fr
    }
  )}`;
  let errors = [];

  const onSave = async e => {
    try {
      await post('events', e.detail, token);

      return goto('/faircalendar');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>Permacoop - {pageTitle}</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb
    items={[{ title: 'FairCalendar', path: 'faircalendar' }, { title: pageTitle }]} />
  <ServerErrors {errors} />
  <Form
    on:save={onSave}
    event={{ date, type: 'mission', time: '100', summary: '', taskId: null, projectId: null }} />
</div>
