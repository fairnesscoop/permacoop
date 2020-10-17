<script context="module">
  export const preload = async ({ query }, { user }) => {
    return {
      page: query.page || 1,
      token: user.apiToken,
    };
  };
</script>

<script>
  import { onMount } from 'svelte';
  import { errorNormalizer } from '../../../normalizer/errors';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import SecuredLink from '../../../components/SecuredLink.svelte';
  import Loader from '../../../components/Loader.svelte';
  import Table from './_Table.svelte';
  import { get } from '../../../utils/axios';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import { ROLE_COOPERATOR, ROLE_EMPLOYEE } from '../../../constants/roles';
  import { historyPushState } from '../../../utils/url';
  import Pagination from '../../../components/Pagination.svelte';

  export let token;
  export let page;

  let roles = [ROLE_COOPERATOR, ROLE_EMPLOYEE];
  let title = 'Congés';
  let loading;
  let errors = [];
  let response = {
    items: [],
    totalItems: 0,
    pageCount: 0,
  };

  onMount(async () => {
    fetchHolidays();
  });

  const changePage = async (e) => {
    page = e.detail;
    historyPushState('human_resources/holidays', { page });
    fetchHolidays();
  };

  const fetchHolidays = async () => {
    try {
      loading = true;
      response = (await get('holidays', { params: { page } }, token)).data;
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>{title} - Permacoop</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items="{[{ title: 'RH' }, { title }]}" />
  <ServerErrors errors="{errors}" />
  <div class="row">
    <div class="col-md-8">
      <h3>{title} <small>({response.totalItems})</small></h3>
    </div>
    <div class="col-md-4">
      <SecuredLink
        className="btn btn-primary float-right mb-3"
        href="human_resources/holidays/add"
        roles="{roles}"
      >
        + Demande de congé
      </SecuredLink>
    </div>
  </div>
  <Loader loading="{loading}" />
  <Table items="{response.items}" roles="{roles}" />
  <Pagination
    on:change="{changePage}"
    currentPage="{page}"
    pageCount="{response.pageCount}"
  />
</div>
