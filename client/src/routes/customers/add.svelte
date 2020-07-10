<script>
  import { goto, stores } from '@sapper/app';
  import Breadcrumb from '../../components/Breadcrumb.svelte';
  import { post } from '../../utils/axios';
  import { errorNormalizer } from '../../normalizer/errors';
  import ServerErrors from '../../components/ServerErrors.svelte';
  import Form from './_Form.svelte';

  let pageTitle = 'Ajouter un client';
  let errors = [];

  const { session } = stores();

  const onSave = async e => {
    try {
      await post('customers', e.detail, $session.user.apiToken);

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
    items={[{ title: 'Clients', path: 'customers' }, { title: pageTitle }]} />
  <ServerErrors {errors} />
  <Form
    customer={{ name: '', address: { street: '', city: '', zipCode: '', country: 'FR' } }}
    on:save={onSave} />
</div>
