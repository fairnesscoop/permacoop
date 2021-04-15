<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import { post } from 'utils/axios';
  import { errorNormalizer } from 'normalizer/errors';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import Form from './_Form.svelte';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';

  let title = $_('human_resources.pay_slips.add.title');
  let errors = [];
  let loading = false;

  const onSave = async (e) => {
    try {
      loading = true;
      await post('pay_slips', e.detail);
      goto('/human_resources/pay_slips');
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
  items="{[{ title: $_('human_resources.breadcrumb') }, { title: $_('human_resources.pay_slips.title'), path: 'human_resources/pay_slips' }, { title }]}" />
<ServerErrors errors="{errors}" />
<H4Title title="{title}" />
<Form on:save="{onSave}" loading="{loading}" />
