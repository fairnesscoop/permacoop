<script context="module">
  export const preload = ({ query }) => {
    return {
      page: query.page || 1,
    };
  };
</script>

<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import H4Title from 'components/H4Title.svelte';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import Link from 'components/links/Link.svelte';
  import ServerErrors from 'components/ServerErrors.svelte';
  import Pagination from 'components/Pagination.svelte';
  import { get } from 'utils/axios';
  import { historyPushState } from 'utils/url';
  import { errorNormalizer } from 'normalizer/errors';
  import Table from './_Table.svelte';

  export let page;

  let title = $_('human_resources.leaves.title');
  let errors = [];
  let response = {
    items: [],
    totalItems: 0,
    pageCount: 0,
  };

  onMount(async () => {
    fetchLeaves();
  });

  const changePage = async (e) => {
    page = e.detail;
    historyPushState('human_resources/leaves', { page });
    fetchLeaves();
  };

  const fetchLeaves = async () => {
    try {
      response = (await get('leaves', { params: { page } })).data;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb
  items="{[{ title: $_('human_resources.breadcrumb') }, { title }]}" />
<div class="inline-flex items-center">
  <H4Title title="{title}" />
  <Link
    href="{'/human_resources/leaves/requests'}"
    value="{$_('human_resources.leaves.requests.title')}" />
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
