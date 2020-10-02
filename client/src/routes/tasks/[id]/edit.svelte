<script context="module">
  import {client as axios} from '../../../utils/axios';

  export const preload = async ({params}) => {
    const {data} = await axios.get(`tasks/${params.id}`);

    return {task: data};
  };
</script>

<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import Form from '../_Form.svelte';
  import {errorNormalizer} from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import SecuredView from '../../../components/SecuredView.svelte';
  import {ROLE_COOPERATOR, ROLE_EMPLOYEE} from '../../../constants/roles';

  export let task;

  let title = `Edition de la mission "${task.name}"`;
  let errors = [];

  const onSave = async e => {
    try {
      await axios.put(`tasks/${task.id}`, e.detail);

      return goto('/tasks');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>Permacoop - {title}</title>
</svelte:head>

<SecuredView roles={[ROLE_COOPERATOR, ROLE_EMPLOYEE]}>
  <div class="col-md-12">
    <Breadcrumb items={[{title: 'Missions', path: 'tasks'}, {title}]} />
    <ServerErrors {errors} />
    <Form name={task.name} on:save={onSave} />
  </div>
</SecuredView>
