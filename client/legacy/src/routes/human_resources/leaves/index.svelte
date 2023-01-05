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
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import Link from 'components/links/Link.svelte';
  import Pagination from 'components/Pagination.svelte';
  import { get, del } from 'utils/axios';
  import { historyPushState } from 'utils/url';
  import { errorNormalizer } from 'normalizer/errors';
  import Table from './_Table.svelte';
  import CalendarLink from './_CalendarLink.svelte';

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

  const handleDelete = async (event) => {
    const id = event.detail;

    try {
      await del(`leave-requests/${id}`);
      response.items = response.items.filter(
        (leaveRequest) => leaveRequest.id !== id
      );
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items={[{ title: $_('human_resources.breadcrumb') }, { title }]} />

<div class="lg:flex justify-between items-center mb-6">
  <div class="flex items-center">
    <h4 class="text-lg font-semibold text-gray-600 dark:text-gray-300">
      {title}
    </h4>
    
    <Link href={'/human_resources/leaves/requests'} value={$_('human_resources.leaves.requests.title')} />
  </div>
  <div class="mt-4 lg:mt-0">
    <CalendarLink />
  </div>
</div>

<div class="w-full overflow-hidden rounded-lg shadow-xs">
  <div class="w-full overflow-x-auto">
    <Table items={response.items} on:delete={handleDelete} />
  </div>
  <Pagination
    on:change={changePage}
    currentPage={page}
    totalItems={response.totalItems}
    pageCount={response.pageCount} />
</div>
