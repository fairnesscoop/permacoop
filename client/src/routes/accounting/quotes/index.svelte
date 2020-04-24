<script>
  import {onMount} from 'svelte';
  import {format as dateFormat} from 'date-fns';
  import {fr} from 'date-fns/locale';
  import {client as axios} from '../../../utils/axios';
  import {errorNormalizer} from '../../../normalizer/errors';
  import Breadcrumb from '../../_components/Breadcrumb.svelte';
  import Loader from '../../_components/Loader.svelte';
  import ServerErrors from '../../_components/ServerErrors.svelte';
  import {format} from '../../../normalizer/money';

  let loading = true;
  let errors = [];
  let data = [];

  onMount(async () => {
    try {
      ({data} = await axios.get('quotes'));
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Permacoop - Devis</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{title: 'Comptabilité'}, {title: 'Devis'}]} />
  <ServerErrors {errors} />
  <a class="btn btn-primary mb-3" href="accounting/quotes/add">
    + Créer un nouveau devis
  </a>
  <table class="table table-striped table-bordered table-hover">
    <thead>
      <tr>
        <th>Date</th>
        <th>Numéro de devis</th>
        <th>Nom du client</th>
        <th>Statut</th>
        <th>Montant TTC</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each data as quote (quote.id)}
        <tr>
          <td>
            {dateFormat(new Date(quote.createdAt), 'dd/MM/yyyy', {locale: fr})}
          </td>
          <td>{quote.quoteId}</td>
          <td>
            {quote.customer.name}
            {#if quote.project}({quote.project.name}){/if}
          </td>
          <td>{quote.status}</td>
          <td>{format(quote.amountInclusiveOfTaxe)}</td>
          <td>
            <a class="btn btn-outline-secondary btn-sm" href={''}>Modifier</a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <Loader {loading} />
</div>
