<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import {post} from '../../../utils/axios';
  import {errorNormalizer} from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import H4Title from '../../../components/H4Title.svelte';
  import Form from './_Form.svelte';

  let title = 'Ajouter un client';
  let loading = false;
  let errors = [];

  const onSave = async e => {
    try {
      loading = true;
      await post('customers', e.detail);
      goto('/crm/customers');
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

<Breadcrumb items={[{title: 'CRM'}, {title: 'Clients', path: '/crm/customers'}, {title}]} />
<H4Title {title} />
<ServerErrors {errors} />
<Form
  {loading}
  customer={{name: '', address: {street: '', city: '', zipCode: '', country: 'FR'}}}
  on:save={onSave} />
