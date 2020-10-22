<script context="module">
  export const preload = ({params}) => {
    return {
      date: params.date
    };
  };
</script>

<script>
  import {goto} from '@sapper/app';
  import {format} from 'date-fns';
  import {fr} from 'date-fns/locale';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import {post} from '../../../utils/axios';
  import Form from '../_Form.svelte';
  import {errorNormalizer} from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import H4Title from '../../../components/H4Title.svelte';

  export let date;

  let title = `Activité du ${format(new Date(date), 'EEEE dd MMMM yyyy', { locale: fr } )}`;
  let errors = [];
  let loading = false;

  const onSave = async e => {
    try {
      loading = true;
      await post('events', e.detail);
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
<H4Title {title} />
<Form
  {loading}
  on:save={onSave}
  event={{date, type: 'mission', time: '100', summary: '', taskId: null, projectId: null}} />
