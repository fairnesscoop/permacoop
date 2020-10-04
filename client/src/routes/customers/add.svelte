<script>
  import {goto, stores} from '@sapper/app';
  import Breadcrumb from '../../components/Breadcrumb.svelte';
  import {post} from '../../utils/axios';
  import {errorNormalizer} from '../../normalizer/errors';
  import ServerErrors from '../../components/ServerErrors.svelte';
  import Form from './_Form.svelte';

  const { session } = stores();

  let title = 'Ajouter un client';
  let errors = [];

  const onSave = async e => {
    try {
      await post('customers', e.detail, $session.user.apiToken);

      goto('/customers');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>{title} - Permacoop</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb
    items={[{title: 'Clients', path: 'customers'}, {title}]} />
  <ServerErrors {errors} />
  <Form
    customer={{name: '', address: {street: '', city: '', zipCode: '', country: 'FR'}}}
    on:save={onSave} />
</div>
