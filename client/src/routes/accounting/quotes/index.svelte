<script context="module">
  export const preload = async ({ query }, { user }) => {
    return {
      page: query.page || 1,
      token: user.apiToken
    };
  };
</script>

<script>
  import { onMount } from 'svelte';
  import { get } from '../../../utils/axios';
  import { errorNormalizer } from '../../../normalizer/errors';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import Loader from '../../../components/Loader.svelte';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import SecuredLink from '../../../components/SecuredLink.svelte';
  import Table from './_Table.svelte';
  import Pagination from '../../../components/Pagination.svelte';
  import { historyPushState } from '../../../utils/url';
  import { ROLE_COOPERATOR, ROLE_EMPLOYEE } from '../../../constants/roles';

  export let page;
  export let token;

  let title = 'Devis';
  let loading;
  let errors = [];
  let roles = [ROLE_COOPERATOR, ROLE_EMPLOYEE];
  let response = {
    items: [],
    totalItems: 0,
    pageCount: 0
  };

  onMount(async () => {
    fetchQuotes();
  });

  const changePage = async e => {
    page = e.detail;
    historyPushState('accounting/quotes', { page });
    fetchQuotes();
  };

  const fetchQuotes = async () => {
    try {
      loading = true;
      response = (await get('quotes', { params: { page } }, token)).data;
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

<div class="col-md-12">
  <Breadcrumb items={[{ title: 'Gestion & Comptabilité' }, { title }]} />
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
        href="accounting/quotes/add"
        {roles}>
        + Créer un nouveau devis
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
