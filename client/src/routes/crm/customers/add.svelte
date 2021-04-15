<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import { post } from 'utils/axios';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';
  import Form from './_Form.svelte';

  let title = $_('crm.customers.add.title');
  let loading = false;
  let errors = [];

  const customer = {
    name: '',
    address: {
      street: '',
      city: '',
      zipCode: '',
      country: 'FR',
    },
  };

  const onSave = async (e) => {
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
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb
  items="{[{ title: $_('crm.breadcrumb') }, { title: $_('crm.customers.title'), path: '/crm/customers' }, { title }]}" />
<H4Title title="{title}" />
<ServerErrors errors="{errors}" />
<Form loading="{loading}" customer="{customer}" on:save="{onSave}" />
