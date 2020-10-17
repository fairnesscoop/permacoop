<script context="module">
  import { get, put } from '../../../utils/axios';

  export const preload = async ({ params }, { user }) => {
    const token = user.apiToken;
    const { data } = await get(`projects/${params.id}`, {}, token);

    return { project: data, token };
  };
</script>

<script>
  import { goto } from '@sapper/app';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import Form from '../_Form.svelte';
  import { errorNormalizer } from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';

  export let token;
  export let project;

  let errors = [];
  let title = `Edition du projet "${project.name}"`;

  const onSave = async (e) => {
    try {
      await put(`projects/${project.id}`, e.detail, token);

      return goto('/projects');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>{title} - Permacoop</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items="{[{ title: 'Projets', path: 'projects' }, { title }]}" />
  <ServerErrors errors="{errors}" />
  <Form
    customerId="{project.customer.id}"
    name="{project.name}"
    on:save="{onSave}" />
</div>
