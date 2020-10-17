<script>
  import SecuredLink from '../../components/SecuredLink.svelte';
  import { byAlpha2 } from 'iso-country-codes';

  export let items;
  export let roles;
</script>

<table class="table table-striped table-bordered table-hover">
  <thead>
    <tr>
      <th>Client</th>
      <th>Adresse</th>
      <th />
    </tr>
  </thead>
  <tbody>
    {#each items as customer (customer.id)}
      <tr>
        <td>{customer.name}</td>
        <td>
          {customer.address.street}
          <br />
          {customer.address.zipCode}
          {customer.address.city}
          <br />
          {byAlpha2[customer.address.country].name}
        </td>
        <td>
          <SecuredLink
            className="btn btn-outline-secondary btn-sm"
            href={`/customers/${customer.id}/edit`}
            {roles}>
            Modifier
          </SecuredLink>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
