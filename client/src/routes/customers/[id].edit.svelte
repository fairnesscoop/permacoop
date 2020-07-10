<script context="module">
  import { get, put } from '../../utils/axios';

  export const preload = async ({ params }, { user }) => {
    const { data } = await get(`customers/${params.id}`, {}, user.apiToken);

    return { customer: data, token: user.apiToken };
  };
</script>

<script>
  import { goto } from '@sapper/app';
  import Breadcrumb from '../../components/Breadcrumb.svelte';
  import Form from './_Form.svelte';
  import { errorNormalizer } from '../../normalizer/errors';
  import ServerErrors from '../../components/ServerErrors.svelte';

  export let token;
  export let customer;

  let errors = [];
  let pageTitle = `Edition du client "${customer.name}"`;

  const onSave = async e => {
    try {
      await put(`customers/${customer.id}`, e.detail, token);

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
  <Form {customer} on:save={onSave} />
</div>
