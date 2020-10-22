<script context="module">
  import {get, put} from '../../../../utils/axios';

  export const preload = async ({params}) => {
    const {data} = await get(`tasks/${params.id}`);

    return {task: data};
  };
</script>

<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../../../../components/Breadcrumb.svelte';
  import H4Title from '../../../../components/H4Title.svelte';
  import Form from '../_Form.svelte';
  import {errorNormalizer} from '../../../../normalizer/errors';
  import ServerErrors from '../../../../components/ServerErrors.svelte';

  export let task;

  let title = `Edition de la mission "${task.name}"`;
  let loading = false;
  let errors = [];

  const onSave = async e => {
    try {
      loading = true;
      await put(`tasks/${task.id}`, e.detail);
      goto('/accounting/tasks');
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

<Breadcrumb items={[{title: 'Gestion & Comptabilité'}, {title: 'Missions', path: '/accounting/tasks'}, {title}]} />
<H4Title {title} />
<ServerErrors {errors} />
<Form name={task.name} on:save={onSave} {loading} />
