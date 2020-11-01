<script context="module">
  import { get, put } from '../../../../utils/axios';

  export const preload = async ({params}) => {
    const { data } = await get(`projects/${params.id}`);

    return { project: data };
  };
</script>

<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import Breadcrumb from '../../../../components/Breadcrumb.svelte';
  import Form from '../_Form.svelte';
  import { errorNormalizer } from '../../../../normalizer/errors';
  import ServerErrors from '../../../../components/ServerErrors.svelte';
  import H4Title from '../../../../components/H4Title.svelte';

  export let project;

  let errors = [];
  let loading = false;
  let title = $_('crm.projects.edit.title', { values: { name: project.name }});

  const onSave = async e => {
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

<Breadcrumb items={[{title: $_('crm.breadcrumb')}, {title: $_('crm.projects.title'), path: '/crm/projects'}, {title}]} />
<H4Title {title} />
<ServerErrors {errors} />
<Form
  {loading}
  customerId={project.customer.id}
  name={project.name}
  on:save={onSave} />
