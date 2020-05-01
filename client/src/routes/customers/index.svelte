<script>
  import {onMount} from 'svelte';
  import {byAlpha2} from 'iso-country-codes';
  import {client as axios} from '../../utils/axios';
  import {errorNormalizer} from '../../normalizer/errors';
  import Breadcrumb from '../../components/Breadcrumb.svelte';
  import Loader from '../../components/Loader.svelte';
  import ServerErrors from '../../components/ServerErrors.svelte';
  import SecuredView from '../../components/SecuredView.svelte';
  import SecuredLink from '../../components/SecuredLink.svelte';
  import {ROLE_COOPERATOR, ROLE_EMPLOYEE} from '../../constants/roles';

  let pageTitle = 'Clients';
  let loading = true;
  let errors = [];
  let data = [];
  let roles = [ROLE_COOPERATOR, ROLE_EMPLOYEE];

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

<SecuredView {roles}>
  <div class="col-md-12">
    <Breadcrumb items={[{title: pageTitle}]} />
    <ServerErrors {errors} />
    <SecuredLink className="btn btn-primary mb-3" href="customers/add" {roles}>
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
    <Loader {loading} />
  </div>
</SecuredView>
