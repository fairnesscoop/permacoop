<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../_components/Breadcrumb.svelte';
  import {client as axios} from '../../utils/axios';
  import {errorNormalizer} from '../../normalizer/errors';
  import ServerErrors from '../_components/ServerErrors.svelte';
  import Form from './_Form.svelte';

  let pageTitle = 'Ajouter un client';
  let errors = [];

  const onSave = async e => {
    try {
      await axios.post('customers', e.detail);

      return goto('/customers');
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
    items={[{title: 'Clients', path: 'customers'}, {title: pageTitle}]} />
  <ServerErrors {errors} />
  <Form on:save={onSave} />
</div>
