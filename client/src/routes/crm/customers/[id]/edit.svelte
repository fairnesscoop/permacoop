<script context="module">
  import {get, put} from '../../../../utils/axios';

  export const preload = async ({params}) => {
    const {data} = await get(`customers/${params.id}`);

    return {customer: data};
  };
</script>

<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../../../../components/Breadcrumb.svelte';
  import Form from '../_Form.svelte';
  import {errorNormalizer} from '../../../../normalizer/errors';
  import ServerErrors from '../../../../components/ServerErrors.svelte';
  import H4Title from '../../../../components/H4Title.svelte';

  export let customer;

  let errors = [];
  let loading = false;
  let title = `Edition du client "${customer.name}"`;

  const onSave = async e => {
    try {
      loading = true;
      await put(`customers/${customer.id}`, e.detail);
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
<Form {loading} {customer} on:save={onSave} />
