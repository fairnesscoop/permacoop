<script context="module">
  import {get, put} from '../../../../utils/axios';

  export const preload = async ({params}, {user}) => {
    const token = user.apiToken;
    const {data} = await get(`projects/${params.id}`, {}, token);

    return {project: data, token};
  };
</script>

<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../../../../components/Breadcrumb.svelte';
  import Form from '../_Form.svelte';
  import {errorNormalizer} from '../../../../normalizer/errors';
  import ServerErrors from '../../../../components/ServerErrors.svelte';
  import H4Title from '../../../../components/H4Title.svelte';

  export let token;
  export let project;

  let errors = [];
  let loading = false;
  let title = `Edition du projet "${project.name}"`;

  const onSave = async e => {
    try {
      loading = true;
      await put(`projects/${project.id}`, e.detail, token);
      goto('/crm/projects');
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

<Breadcrumb items={[{title: 'CRM'}, {title: 'Projets', path: '/crm/projects'}, {title}]} />
<H4Title {title} />
<ServerErrors {errors} />
<Form
  {loading}
  customerId={project.customer.id}
  name={project.name}
  on:save={onSave} />
