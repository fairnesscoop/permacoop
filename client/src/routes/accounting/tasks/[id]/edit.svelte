<script context="module">
  export const preload = async ({ params: { id }}) => {
    return { id };
  };
</script>

<script>
  import { goto} from '@sapper/app';
  import { onMount } from 'svelte';
  import { get, put } from '../../../../utils/axios';
  import { _ } from 'svelte-i18n';
  import Breadcrumb from '../../../../components/Breadcrumb.svelte';
  import H4Title from '../../../../components/H4Title.svelte';
  import Form from '../_Form.svelte';
  import { errorNormalizer } from '../../../../normalizer/errors';
  import ServerErrors from '../../../../components/ServerErrors.svelte';

  export let id;

  let task;
  let loading = false;
  let errors = [];
  let title = '';
  
  onMount(async () => {
    try {
      ({ data: task } = await get(`tasks/${id}`));
      title = $_('accounting.tasks.edit.title', { values: { name: task.name }});
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });

  const onSave = async e => {
    try {
      loading = true;
      await put(`tasks/${id}`, e.detail);
      goto('/accounting/tasks');
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

<Breadcrumb items={[{title: $_('accounting.breadcrumb')}, {title: $_('accounting.tasks.title'), path: '/accounting/tasks'}, {title}]} />
<H4Title {title} />
<ServerErrors {errors} />
{#if task}
  <Form name={task.name} on:save={onSave} {loading} />
{/if}
