<script context="module">
  import { get, put } from '../../utils/axios';

  export const preload = async ({ params }, { user }) => {
    const { data } = await get(`tasks/${params.id}`, {}, user.apiToken);

    return { task: data, token: user.apiToken };
  };
</script>

<script>
  import { goto } from '@sapper/app';
  import Breadcrumb from '../../components/Breadcrumb.svelte';
  import Form from './_Form.svelte';
  import { errorNormalizer } from '../../normalizer/errors';
  import ServerErrors from '../../components/ServerErrors.svelte';

  export let token;
  export let task;

  let title = `Edition de la mission "${task.name}"`;
  let errors = [];

  const onSave = async e => {
    try {
      await put(`tasks/${task.id}`, e.detail, token);

      return goto('/tasks');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>Permacoop - {title}</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{ title: 'Missions', path: 'tasks' }, { title }]} />
  <ServerErrors {errors} />
  <Form name={task.name} on:save={onSave} />
</div>
