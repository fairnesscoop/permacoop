<script context="module">
  export const preload = async ({query}) => {
    return {
      page: query.page || 1
    };
  };
</script>

<script>
  import {onMount} from 'svelte';
  import {client as axios} from '../../utils/axios';
  import {errorNormalizer} from '../../normalizer/errors';
  import Breadcrumb from '../../components/Breadcrumb.svelte';
  import Loader from '../../components/Loader.svelte';
  import ServerErrors from '../../components/ServerErrors.svelte';
  import SecuredView from '../../components/SecuredView.svelte';
  import SecuredLink from '../../components/SecuredLink.svelte';
  import Table from './_Table.svelte';
  import {historyPushState} from '../../utils/url';
  import Pagination from '../../components/Pagination.svelte';
  import {ROLE_COOPERATOR, ROLE_EMPLOYEE} from '../../constants/roles';

  export let page;

  let title = 'Clients';
  let loading;
  let errors = [];
  let roles = [ROLE_COOPERATOR, ROLE_EMPLOYEE];
  let response = {
    items: [],
    totalItems: 0,
    pageCount: 0
  };

  onMount(async () => {
    fetchCustomers();
  });

  const changePage = async e => {
    page = e.detail;
    historyPushState('customers', {page});
    fetchCustomers();
  };

  const fetchCustomers = async () => {
    try {
      loading = true;
      response = (await axios.get('customers', {params: {page}})).data;
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>Permacoop - {title}</title>
</svelte:head>

<SecuredView {roles}>
  <div class="col-md-12">
    <Breadcrumb items={[{title}]} />
    <div class="row">
      <div class="col-md-8">
        <h3>
          {title}
          <small>({response.totalItems})</small>
        </h3>
      </div>
      <div class="col-md-4">
        <SecuredLink
          className="btn btn-primary float-right mb-3"
          href="customers/add"
          {roles}>
          + Ajouter un client
        </SecuredLink>
      </div>
    </div>
    <ServerErrors {errors} />
    <Loader {loading} />
    <Table items={response.items} {roles} />
    <Pagination
      on:change={changePage}
      currentPage={page}
      pageCount={response.pageCount} />
  </div>
</SecuredView>
