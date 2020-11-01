<script context="module">
  import { get, put } from '../../../../utils/axios';

  export const preload = async ({ params }) => {
    const { data } = await get(`daily_rates/${params.id}`);

    return { dailyRate: data };
  };
</script>

<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import Breadcrumb from '../../../../components/Breadcrumb.svelte';
  import Form from '../_Form.svelte';
  import { errorNormalizer } from '../../../../normalizer/errors';
  import ServerErrors from '../../../../components/ServerErrors.svelte';
  import H4Title from '../../../../components/H4Title.svelte';

  export let dailyRate;
  export let loading = false;

  const { user, customer, amount, task } = dailyRate;
  let taskId = task.id;
  let customerId = customer.id;
  let userId = user.id;

  const name = `${user.firstName} ${user.lastName} - ${customer.name}`;
  let title = $_('accounting.daily_rates.edit.title', { values: { name }});
  let errors = [];

  const onSave = async e => {
    try {
      loading = true;
      await put(`daily_rates/${dailyRate.id}`, e.detail);
      goto('/accounting/daily_rates');
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

<Breadcrumb items={[{title: $_('accounting.breadcrumb')}, {title: 'TJM', path: 'accounting/daily_rates'}, {title}]} />
<H4Title {title} />
<ServerErrors {errors} />
<Form on:save={onSave} {amount} {taskId} {customerId} {userId} {loading} />
