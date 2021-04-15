<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { goto } from '@sapper/app';
  import { post } from 'utils/axios';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import Form from './_Form.svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';

  let errors = [];
  let loading = false;
  let title = $_('accounting.invoices.add.title');

  const onSave = async (e) => {
    try {
      loading = true;
      await post('invoices', e.detail);
      goto('/accounting/invoices');
    } catch (e) {
      loading = false;
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb
  items="{[{ title: $_('accounting.breadcrumb') }, { path: 'accounting/invoices', title: $_('accounting.invoices.title') }, { title }]}" />
<H4Title title="{title}" />
<ServerErrors errors="{errors}" />
<Form on:save="{onSave}" loading="{loading}" />
