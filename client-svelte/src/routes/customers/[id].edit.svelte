<script context="module">
  import {client as axios} from '../../utils/axios';

  export const preload = async ({params}) => {
    const {data} = await axios.get(`customers/${params.id}`);

    return {task: data};
  };
</script>

<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../_components/Breadcrumb.svelte';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../normalizer/errors';
  import ServerErrors from '../_components/ServerErrors.svelte';

  export let task;

  let errors = [];
  let pageTitle = `Edition de la mission "${task.name}"`;

  const onSave = async e => {
    try {
      await axios.put(`customers/${task.id}`, e.detail);

      return goto('/customers');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>CoopERP - {pageTitle}</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb
    items={[{title: 'Clients', path: 'customers'}, {title: pageTitle}]} />
  <ServerErrors {errors} />
  <Form name={task.name} on:save={onSave} />
</div>
