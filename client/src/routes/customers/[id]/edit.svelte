<script context="module">
  import {get, put} from '../../../utils/axios';

  export const preload = async ({params}, {user}) => {
    const token = user.apiToken;
    const {data} = await get(`customers/${params.id}`, {}, token);

    return {customer: data, token};
  };
</script>

<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import Form from '../_Form.svelte';
  import {errorNormalizer} from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';

  export let token;
  export let customer;

  let errors = [];
  let title = `Edition du client "${customer.name}"`;

  const onSave = async e => {
    try {
      await put(`customers/${customer.id}`, e.detail, token);

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
  <Form {customer} on:save={onSave} />
</div>
