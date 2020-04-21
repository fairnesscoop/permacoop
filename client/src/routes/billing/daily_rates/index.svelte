<script>
  import {onMount} from 'svelte';
  import {client as axios} from '../../../utils/axios';
  import {errorNormalizer} from '../../../normalizer/errors';
  import Breadcrumb from '../../_components/Breadcrumb.svelte';
  import Loader from '../../_components/Loader.svelte';
  import ServerErrors from '../../_components/ServerErrors.svelte';

  let loading = true;
  let errors = [];
  let data = [];

  onMount(async () => {
    try {
      ({data} = await axios.get('daily_rates'));
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Permacoop - TJM</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{title: 'Facturation'}, {title: 'TJM'}]} />
  <ServerErrors {errors} />
  <a class="btn btn-primary mb-3" href="billing/daily_rates/add">
    + Ajouter un TJM
  </a>
  <table class="table table-striped table-bordered table-hover">
    <thead>
      <tr>
        <th>Coopérateur</th>
        <th>Mission</th>
        <th>Client</th>
        <th>Montant HT</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each data as dailyRate (dailyRate.id)}
        <tr>
          <td>{dailyRate.user.firstName} {dailyRate.user.lastName}</td>
          <td>{dailyRate.task.name}</td>
          <td>{dailyRate.customer.name}</td>
          <td>{dailyRate.amount} €</td>
          <td>
            <a
              class="btn btn-outline-secondary btn-sm"
              href={`billing/daily_rates/${dailyRate.id}/edit`}>
              Modifier
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <Loader {loading} />
</div>
