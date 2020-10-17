<script>
  import SecuredLink from '../../../components/SecuredLink.svelte';
  import { format } from '../../../normalizer/money';

  export let roles;
  export let items;
</script>

<table class="table table-striped table-bordered table-hover">
  <thead>
    <tr>
      <th>Utilisateur</th>
      <th>Mission</th>
      <th>Client</th>
      <th>Montant HT</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each items as dailyRate (dailyRate.id)}
      <tr>
        <td>{dailyRate.user.firstName} {dailyRate.user.lastName}</td>
        <td>{dailyRate.task.name}</td>
        <td>{dailyRate.customer.name}</td>
        <td>{format(dailyRate.amount)}</td>
        <td>
          <SecuredLink
            className="btn btn-outline-secondary btn-sm"
            roles="{roles}"
            href="{`accounting/daily_rates/${dailyRate.id}/edit`}">
            Modifier
          </SecuredLink>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
