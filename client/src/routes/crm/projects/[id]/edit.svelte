<script context="module">
  export const preload = ({ params: { id } }) => {
    return { id };
  };
</script>

<script>
  import { goto } from '@sapper/app';
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { get, put } from 'utils/axios';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import Form from '../_Form.svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';

  export let id;

  let errors = [];
  let loading = false;
  let title = '';
  let project;

  onMount(async () => {
    try {
      ({ data: project } = await get(`projects/${id}`));
      title = $_('crm.projects.edit.title', { values: { name: project.name } });
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });

  const onSave = async (e) => {
    try {
      loading = true;
      await put(`projects/${project.id}`, e.detail);
      goto('/crm/projects');
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
  items={[{ title: $_('crm.breadcrumb') }, { title: $_('crm.projects.title'), path: '/crm/projects' }, { title }]} />
<H4Title {title} />
<ServerErrors {errors} />
{#if project}
  <Form
    {loading}
    customerId={project.customer.id}
    name={project.name}
    invoiceUnit={project.invoiceUnit}
    on:save={onSave} />
{/if}
