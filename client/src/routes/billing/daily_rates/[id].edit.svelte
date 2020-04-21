<script context="module">
  import {client as axios} from '../../../utils/axios';

  export const preload = async ({params}) => {
    const {data} = await axios.get(`daily_rates/${params.id}`);

    return {dailyRate: data};
  };
</script>

<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../../_components/Breadcrumb.svelte';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../../normalizer/errors';
  import ServerErrors from '../../_components/ServerErrors.svelte';

  export let dailyRate;

  let amount = dailyRate.amount;
  let taskId = dailyRate.task.id;
  let customerId = dailyRate.customer.id;
  let userId = dailyRate.user.id;
  let userName = `${dailyRate.user.firstName} ${dailyRate.user.lastName}`;

  let pageTitle = `Modification du TJM de ${userName} pour ${dailyRate.customer.name}`;
  let errors = [];

  const onSave = async e => {
    try {
      await axios.put(`daily_rates/${dailyRate.id}`, e.detail);

      return goto('/billing/daily_rates');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>Permacoop - {pageTitle}</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb
    items={[{title: 'Facturation'}, {title: 'TJM', path: 'billing/daily_rates'}, {title: pageTitle}]} />
  <ServerErrors {errors} />
  <Form on:save={onSave} {amount} {taskId} {customerId} {userId} />
</div>
