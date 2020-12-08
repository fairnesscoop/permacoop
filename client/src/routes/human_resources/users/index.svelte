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
  import { get } from '../../../utils/axios';
  import { errorNormalizer } from '../../../normalizer/errors';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import H4Title from '../../../components/H4Title.svelte';
  import AddLink from '../../../components/links/AddLink.svelte';
  import Table from './_Table.svelte';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import { historyPushState } from '../../../utils/url';
  import Pagination from '../../../components/Pagination.svelte';

  export let page;

  let title = $_('human_resources.users.title');
  let errors = [];
  let loading;
  let response = {
    items: [],
    totalItems: 0,
    pageCount: 0,
  };

  onMount(async () => {
    fetchUsers();
  });

  const changePage = async (e) => {
    page = e.detail;
    historyPushState('users', { page });
    fetchUsers();
  };

  const fetchUsers = async () => {
    try {
      response = (await get('users', { params: { page } })).data;
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
<ServerErrors errors="{errors}" />
<div class="inline-flex items-center">
  <H4Title title="{title}" />
  <AddLink
    href="{'/human_resources/users/add'}"
    value="{$_('common.form.add')}" />
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


