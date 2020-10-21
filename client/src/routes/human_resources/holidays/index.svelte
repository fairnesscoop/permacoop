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
  import {errorNormalizer} from '../../../normalizer/errors';
  import H4Title from '../../../components/H4Title.svelte';
  import AddLink from '../../../components/AddLink.svelte';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import Table from './_Table.svelte';
  import {get} from '../../../utils/axios';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import {historyPushState} from '../../../utils/url';
  import Pagination from '../../../components/Pagination.svelte';

  export let token;
  export let page;

  let title = 'Congés';
  let errors = [];
  let response = {
    items: [],
    totalItems: 0,
    pageCount: 0
  };

  onMount(async () => {
    fetchHolidays();
  });

  const changePage = async e => {
    page = e.detail;
    historyPushState('human_resources/holidays', {page});
    fetchHolidays();
  };

  const fetchHolidays = async () => {
    try {
      response = (await get('holidays', {params: {page}}, token)).data;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>{title} - Permacoop</title>
</svelte:head>

<Breadcrumb items={[{title: 'RH'}, {title}]} />
<ServerErrors {errors} />
<div class="inline-flex items-center">
  <H4Title {title} />
  <AddLink href={'/human_resources/holidays/add'} value={'Demande de congé'} />
</div>
<div class="w-full overflow-hidden rounded-lg shadow-xs">
  <div class="w-full overflow-x-auto">
    <Table items={response.items} />
  </div>
  <Pagination
    on:change={changePage}
    currentPage={page}
    totalItems={response.totalItems}
    pageCount={response.pageCount} />
</div>
