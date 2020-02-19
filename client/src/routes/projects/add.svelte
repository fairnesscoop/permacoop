<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../_components/Breadcrumb.svelte';
  import {client as axios} from '../../utils/axios';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../normalizer/errors';
  import ServerErrors from '../_components/ServerErrors.svelte';

  let pageTitle = 'Ajouter un projet';
  let errors = [];

  const onSave = async e => {
    try {
      await axios.post('projects', e.detail);

      return goto('/projects');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>Permacoop - {pageTitle}</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb
    items={[{title: 'Projets', path: 'projects'}, {title: pageTitle}]} />
  <ServerErrors {errors} />
  <Form on:save={onSave} />
</div>
