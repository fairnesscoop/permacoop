<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import { post } from 'utils/axios';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';
  import Form from './_Form.svelte';

  const title = $_('human_resources.savings_records.add.title');
  let loading = false;
  let errors = [];

  const onSave = async (e) => {
    try {
      loading = true;
      await post('users/savings-records/increase', {
        amount: e.detail.amount,
        userId: e.detail.userId,
      });
      goto('/human_resources/savings_records');
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
  items={[
    { title: $_('human_resources.breadcrumb') },
    { title: $_('human_resources.savings_records.title'), path: '/human_resources/savings_records' },
    { title }
  ]}
/>
<H4Title {title} />
<ServerErrors {errors} />
<Form {loading} on:save={onSave} />
