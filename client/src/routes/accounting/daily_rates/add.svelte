<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import { post } from 'utils/axios';
  import Form from './_Form.svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';

  let loading = false;
  let title = $_('accounting.daily_rates.add.title');
  let errors = [];

  const onSave = async (e) => {
    try {
      loading = true;
      await post('daily_rates', e.detail);
      goto('/accounting/daily_rates');
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
  items="{[{ title: $_('accounting.breadcrumb') }, { title: $_('accounting.daily_rates.title'), path: '/accounting/daily_rates' }, { title }]}" />
<H4Title title="{title}" />
<ServerErrors errors="{errors}" />
<Form on:save="{onSave}" loading="{loading}" />
