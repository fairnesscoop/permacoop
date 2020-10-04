<script context="module">
  export const preload = async ({query}, {user}) => {
    return {
      page: query.page || 1,
      token: user.apiToken
    };
  };
</script>

<script>
  import {onMount} from 'svelte';
  import {errorNormalizer} from '../../normalizer/errors';
  import Breadcrumb from '../../components/Breadcrumb.svelte';
  import Loader from '../../components/Loader.svelte';
  import ServerErrors from '../../components/ServerErrors.svelte';
  import {get} from '../../utils/axios';
  import SecuredLink from '../../components/SecuredLink.svelte';
  import Pagination from '../../components/Pagination.svelte';
  import {historyPushState} from '../../utils/url';
  import Table from './_Table.svelte';
  import {ROLE_COOPERATOR, ROLE_EMPLOYEE} from '../../constants/roles';

  export let page;
  export let token;

  let title = 'Missions';
  let loading;
  let errors = [];
  let roles = [ROLE_COOPERATOR, ROLE_EMPLOYEE];
  let response = {
    items: [],
    totalItems: 0,
    pageCount: 0
  };

  onMount(async () => {
    fetchTasks();
  });

  const changePage = async e => {
    page = e.detail;
    historyPushState('tasks', {page});
    fetchTasks();
  };

  const fetchTasks = async () => {
    try {
      loading = true;
      response = (await get('tasks', {params: {page}}, token)).data;
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
        className="btn btn-primary mb-3 float-right"
        href="tasks/add"
        {roles}>
        + Ajouter une mission
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
