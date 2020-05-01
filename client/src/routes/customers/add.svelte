<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../../components/Breadcrumb.svelte';
  import {client as axios} from '../../utils/axios';
  import {errorNormalizer} from '../../normalizer/errors';
  import ServerErrors from '../../components/ServerErrors.svelte';
  import Form from './_Form.svelte';
  import SecuredView from '../../components/SecuredView.svelte';
  import {ROLE_COOPERATOR, ROLE_EMPLOYEE} from '../../utils/roles';

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

<SecuredView roles={[ROLE_COOPERATOR, ROLE_EMPLOYEE]}>
  <div class="col-md-12">
    <Breadcrumb
      items={[{title: 'Clients', path: 'customers'}, {title: pageTitle}]} />
    <ServerErrors {errors} />
    <Form
      customer={{name: '', address: {street: '', city: '', zipCode: '', country: 'FR'}}}
      on:save={onSave} />
  </div>
</SecuredView>
