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

  let loading = false;
  let dailyRate;
  let taskId;
  let customerId;
  let userId;
  let errors = [];
  let title = '';

  onMount(async () => {
    try {
      ({ data: dailyRate } = await get(`daily_rates/${id}`));
      const { user, customer, amount, task } = dailyRate;
      const name = `${user.firstName} ${user.lastName} - ${customer.name}`;
      title = $_('accounting.daily_rates.edit.title', { values: { name } });
      taskId = task.id;
      customerId = customer.id;
      userId = user.id;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });

  const onSave = async (e) => {
    try {
      loading = true;
      await put(`daily_rates/${id}`, e.detail);
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

<Breadcrumb
  items={[{ title: $_('accounting.breadcrumb') }, { title: 'TJM', path: 'accounting/daily_rates' }, { title }]} />
<H4Title {title} />
<ServerErrors {errors} />
{#if dailyRate}
  <Form
    on:save={onSave}
    amount={dailyRate.amount}
    {taskId}
    {customerId}
    {userId}
    {loading} />
{/if}
