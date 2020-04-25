<script context="module">
  import {client as axios} from '../../utils/axios';

  export const preload = async ({params}) => {
    const {data} = await axios.get(`customers/${params.id}`);

    return {customer: data};
  };
</script>

<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../_components/Breadcrumb.svelte';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../normalizer/errors';
  import ServerErrors from '../_components/ServerErrors.svelte';
  import SecuredView from '../_components/SecuredView.svelte';

  export let customer;

  let errors = [];
  let pageTitle = `Edition du client "${customer.name}"`;

  const onSave = async e => {
    try {
      await axios.put(`customers/${customer.id}`, e.detail);

      return goto('/customers');
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
      items={[{title: 'Clients', path: 'customers'}, {title: pageTitle}]} />
    <ServerErrors {errors} />
    <Form {customer} on:save={onSave} />
  </div>
</SecuredView>
