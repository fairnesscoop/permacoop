<script context="module">
  export const preload = ({params: {period}}) => {
    return {
      period
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

  export let period;

  const formatDate = (date) => {
    return format(new Date(date), 'EE dd MMMM', { locale: fr } );
  }

  let startDate = period.split('_')[0];
  let endDate = period.split('_')[1];
  let title = `CRA du ${formatDate(startDate)}`;
  let errors = [];
  let loading = false;
 
  if (startDate !== endDate) {
    title += ` au ${formatDate(endDate)}`;
  }

  const onSave = async e => {
    try {
      loading = true;
      await post('events', e.detail);
      goto(`/faircalendar?date=${startDate}`);
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
  event={{startDate, endDate, type: 'mission', time: '100', summary: '', taskId: null, projectId: null}} />
