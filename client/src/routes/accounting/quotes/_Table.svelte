<script>
  import SecuredLink from '../../../components/SecuredLink.svelte';
  import { format as dateFormat } from 'date-fns';
  import { format } from '../../../normalizer/money';
  import { fr } from 'date-fns/locale';

  export let roles;
  export let items;
</script>

<table class="table table-striped table-bordered table-hover">
  <thead>
    <tr>
      <th>Date</th>
      <th>Numéro de devis</th>
      <th>Nom du client</th>
      <th>Statut</th>
      <th>Montant TTC</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each items as quote (quote.id)}
      <tr>
        <td>
          {dateFormat(new Date(quote.createdAt), 'dd/MM/yyyy', { locale: fr })}
        </td>
        <td>{quote.quoteId}</td>
        <td>
          {quote.customer.name}
          {#if quote.project}({quote.project.name}){/if}
        </td>
        <td><span class="badge badge-{quote.status}">{quote.status}</span></td>
        <td>{format(quote.amountInclusiveOfTaxe)}</td>
        <td>
          <SecuredLink
            className="btn btn-outline-secondary btn-sm"
            href="{''}"
            roles="{roles}">
            Modifier
          </SecuredLink>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
