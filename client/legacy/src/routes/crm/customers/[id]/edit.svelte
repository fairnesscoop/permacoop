<script context="module">
  export const preload = ({ params: { id } }) => {
    return { id };
  };
</script>

<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { get, put } from 'utils/axios';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import Form from '../_Form.svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';

  export let id;

  let customer;
  let errors = [];
  let loading = false;
  let title = '';

  onMount(async () => {
    try {
      ({ data: customer } = await get(`customers/${id}`));
      title = $_('crm.customers.edit.title', {
        values: { name: customer.name },
      });
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });

  const onSave = async (e) => {
    try {
      loading = true;
      await put(`customers/${id}`, e.detail);
      goto('/crm/customers');
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb
  items={[{ title: $_('crm.breadcrumb') }, { title: $_('crm.customers.title'), path: '/crm/customers' }, { title }]} />
<H4Title {title} />
<ServerErrors {errors} />
{#if customer}
  <Form {loading} {customer} on:save={onSave} />
{/if}
