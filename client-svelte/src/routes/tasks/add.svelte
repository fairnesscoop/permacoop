<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../_components/Breadcrumb.svelte';
  import {client as axios} from '../../utils/axios';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../normalizer/errors';
  import ServerErrors from '../_components/ServerErrors.svelte';

  let pageTitle = 'Ajouter une mission';
  let errors = [];

  const onSave = async e => {
    try {
      await axios.post('tasks', e.detail);

      return goto('/tasks');
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
    items={[{title: 'Missions', path: 'tasks'}, {title: pageTitle}]} />
  <ServerErrors {errors} />
  <Form on:save={onSave} />
</div>
