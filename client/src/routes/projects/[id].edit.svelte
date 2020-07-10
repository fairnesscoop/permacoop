<script context="module">
  import { get, put } from '../../utils/axios';

  export const preload = async ({ params }, { user }) => {
    const { data } = await get(`projects/${params.id}`, {}, user.apiToken);

    return { project: data, token: user.apiToken };
  };
</script>

<script>
  import { goto } from '@sapper/app';
  import Breadcrumb from '../../components/Breadcrumb.svelte';
  import Form from './_Form.svelte';
  import { errorNormalizer } from '../../normalizer/errors';
  import ServerErrors from '../../components/ServerErrors.svelte';

  export let project;
  export let token;

  let errors = [];
  let title = `Edition du projet "${project.name}"`;

  const onSave = async e => {
    try {
      await put(`projects/${project.id}`, e.detail, token);

      return goto('/projects');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>Permacoop - {title}</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{ title: 'Projets', path: 'projects' }, { title }]} />
  <ServerErrors {errors} />
  <Form customerId={project.customer.id} name={project.name} on:save={onSave} />
</div>
