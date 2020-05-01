<script context="module">
  import {client as axios} from '../../utils/axios';

  export const preload = async ({params}) => {
    const {data} = await axios.get(`events/${params.id}`);

    return {event: data};
  };
</script>

<script>
  import Breadcrumb from '../../components/Breadcrumb.svelte';
  import {format} from 'date-fns';
  import {fr} from 'date-fns/locale';
  import {goto} from '@sapper/app';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../normalizer/errors';
  import ServerErrors from '../../components/ServerErrors.svelte';
  import SecuredView from '../../components/SecuredView.svelte';

  export let event;

  const taskId = event.task ? event.task.id : null;
  const projectId = event.project ? event.project.id : null;
  const time = String(event.time);

  let errors = [];
  let title = `Edition du ${format(new Date(event.date), 'EEEE dd MMMM yyyy', {
    locale: fr
  })}`;

  const onSave = async e => {
    try {
      await axios.put(`events/${event.id}`, e.detail);

      return goto('/faircalendar');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`events/${event.id}`);

      return goto('/faircalendar');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>Permacoop - {title}</title>
</svelte:head>

<SecuredView roles={['cooperator', 'employee']}>
  <div class="col-md-12">
    <Breadcrumb
      items={[{title: 'FairCalendar', path: 'faircalendar'}, {title: title}]} />
    <ServerErrors {errors} />
    <Form on:save={onSave} event={{...event, taskId, projectId, time}}>
      <button class="btn btn-danger" type="button" on:click={onDelete}>
        Supprimer
      </button>
    </Form>
  </div>
</SecuredView>
