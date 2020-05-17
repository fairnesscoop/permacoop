<script context="module">
  export const preload = async ({query}) => {
    return {
      page: query.page || 1
    };
  };
</script>

<script>
  import {onMount} from 'svelte';
  import {errorNormalizer} from '../../../normalizer/errors';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import SecuredView from '../../../components/SecuredView.svelte';
  import SecuredLink from '../../../components/SecuredLink.svelte';
  import Loader from '../../../components/Loader.svelte';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import Table from './_Table.svelte';
  import {client as axios} from '../../../utils/axios';
  import {historyPushState} from '../../../utils/url';
  import Pagination from '../../../components/Pagination.svelte';
  import {ROLE_COOPERATOR, ROLE_ACCOUNTANT} from '../../../constants/roles';

  export let page;

  let title = 'Fiches de paies';
  let roles = [ROLE_COOPERATOR, ROLE_ACCOUNTANT];
  let loading;
  let errors = [];
  let response = {
    items: [],
    totalItems: 0,
    pageCount: 0
  };

  onMount(async () => {
    fetchPaySlips();
  });

  const changePage = async e => {
    page = e.detail;
    historyPushState('human_resources/pay_slips', {page});
    fetchPaySlips();
  };

  const fetchPaySlips = async () => {
    try {
      loading = true;
      response = (await axios.get('pay_slips', {params: {page}})).data;
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
  <Breadcrumb items={[{title: 'RH'}, {title}]} />
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
        href="human_resources/pay_slips/add"
        {roles}>
        + Ajouter une fiche de paie
      </SecuredLink>
    </div>
  </div>
  <ServerErrors {errors} />
  <Loader {loading} />
  <Table items={response.items} />
  <Pagination
    on:change={changePage}
    currentPage={page}
    pageCount={response.pageCount} />
</div>
