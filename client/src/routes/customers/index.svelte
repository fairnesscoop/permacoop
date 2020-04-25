<script>
  import {onMount} from 'svelte';
  import {byAlpha2} from 'iso-country-codes';
  import {client as axios} from '../../utils/axios';
  import {errorNormalizer} from '../../normalizer/errors';
  import Breadcrumb from '../_components/Breadcrumb.svelte';
  import Loader from '../_components/Loader.svelte';
  import ServerErrors from '../_components/ServerErrors.svelte';
  import SecuredView from '../_components/SecuredView.svelte';
  import SecuredLink from '../_components/SecuredLink.svelte';

  let pageTitle = 'Clients';
  let loading = true;
  let errors = [];
  let data = [];

  onMount(async () => {
    try {
      ({data} = await axios.get('customers'));
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Permacoop - {pageTitle}</title>
</svelte:head>

<SecuredView roles={['cooperator', 'employee']}>
  <div class="col-md-12">
    <Breadcrumb items={[{title: pageTitle}]} />
    <ServerErrors {errors} />
    <SecuredLink
      className="btn btn-primary mb-3"
      href="customers/add"
      roles={['cooperator', 'employee']}>
      + Ajouter un client
    </SecuredLink>
    <table class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>Client</th>
          <th>Adresse</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {#each data as customer (customer.id)}
          <tr>
            <td>{customer.name}</td>
            <td>
              {customer.address.street}
              <br />
              {customer.address.zipCode} {customer.address.city}
              <br />
              {byAlpha2[customer.address.country].name}
            </td>
            <td>
              <a
                class="btn btn-outline-secondary btn-sm"
                href={`/customers/${customer.id}/edit`}>
                Modifier
              </a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <Loader {loading} />
  </div>
</SecuredView>
