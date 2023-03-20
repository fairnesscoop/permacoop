<script>
  import { _ } from 'svelte-i18n';
  import { stores } from '@sapper/app';
  import { get } from 'utils/axios';
  import { onMount } from 'svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import H4Title from '../components/H4Title.svelte';
  import Table from './dashboard/leaves/requests/_Table.svelte';
  import Pagination from '../components/Pagination.svelte';

  const { session } = stores();

  let title = $_('human_resources.leaves.requests.title');
  let page = 1;
  let limit = 5;
  let response = {
    items: [],
    totalItems: 0,
    pageCount: 0,
  };

  onMount(() => {
    fetchLeaveRequests();
  });

  const fetchLeaveRequests = async () => {
    try {
      const { data } = await get('leave-requests', {
        params: { page, limit, status: 'pending' },
      });
      response = data;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>{$_('dashboard.title')} - {$_('app')}</title>
</svelte:head>

{#if $session.user}
  <h2
    class="my-6 inline-flex text-2xl font-semibold text-gray-700 dark:text-gray-200">
    {$_('dashboard.welcome', {
      values: {
        firstName: $session.user.firstName,
        lastName: $session.user.lastName,
      },
    })}
  </h2>
  <div class="inline-flex items-center">
    <H4Title {title} />
  </div>
  <div class="w-full overflow-hidden rounded-lg shadow-xs">
    <div class="w-full overflow-x-auto">
      <Table items={response.items} />
    </div>
    <Pagination
      {limit}
      currentPage={page}
      totalItems={response.totalItems}
      pageCount={response.pageCount} />
  </div>
{/if}
