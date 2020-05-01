<script context="module">
  import {client as axios} from '../../utils/axios';

  export const preload = async ({params}) => {
    const {data} = await axios.get(`projects/${params.id}`);

    return {project: data};
  };
</script>

<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../../components/Breadcrumb.svelte';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../normalizer/errors';
  import ServerErrors from '../../components/ServerErrors.svelte';
  import SecuredView from '../../components/SecuredView.svelte';

  export let project;

  let errors = [];
  let pageTitle = `Edition du projet "${project.name}"`;

  const onSave = async e => {
    try {
      await axios.put(`projects/${project.id}`, e.detail);

      return goto('/projects');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>Permacoop - {pageTitle}</title>
</svelte:head>

<SecuredView roles={['cooperator', 'employee']}>
  <div class="col-md-12">
    <Breadcrumb
      items={[{title: 'Projets', path: 'projects'}, {title: pageTitle}]} />
    <ServerErrors {errors} />
    <Form
      customerId={project.customer.id}
      name={project.name}
      on:save={onSave} />
  </div>
</SecuredView>
