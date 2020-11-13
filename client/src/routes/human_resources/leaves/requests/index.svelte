<script context="module">
  export const preload = async ({ query }) => {
    return {
      page: query.page || 1,
    };
  };
</script>

<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { get } from '../../../../utils/axios';
  import { historyPushState } from '../../../../utils/url';
  import { errorNormalizer } from '../../../../normalizer/errors';
  import H4Title from '../../../../components/H4Title.svelte';
  import AddLink from '../../../../components/links/AddLink.svelte';
  import Breadcrumb from '../../../../components/Breadcrumb.svelte';
  import ServerErrors from '../../../../components/ServerErrors.svelte';
  import Pagination from '../../../../components/Pagination.svelte';
  import Table from './_Table.svelte';

  export let page;

  let title = $_('human_resources.leaves.requests.title');
  let errors = [];
  let response = {
    items: [],
    totalItems: 0,
    pageCount: 0,
  };

  onMount(async () => {
    fetchLeaveRequests();
  });

  const changePage = async (e) => {
    page = e.detail;
    historyPushState('human_resources/leaves/requests', { page });
    fetchLeaveRequests();
  };

  const fetchLeaveRequests = async () => {
    try {
      response = (await get('leave-requests', { params: { page } })).data;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb
  items="{[
    { title: $_('human_resources.breadcrumb') },
    { title: $_('human_resources.leaves.title'), path: '/human_resources/leaves' },
    { title }
  ]}" />
<ServerErrors errors="{errors}" />
<div class="inline-flex items-center">
  <H4Title title="{title}" />
  <AddLink
    href="{'/human_resources/leaves/requests/add'}"
    value="{$_('human_resources.leaves.requests.add.title')}" />
</div>
<div class="w-full overflow-hidden rounded-lg shadow-xs">
  <div class="w-full overflow-x-auto">
    <Table items="{response.items}" />
  </div>
  <Pagination
    on:change="{changePage}"
    currentPage="{page}"
    totalItems="{response.totalItems}"
    pageCount="{response.pageCount}" />
</div>
