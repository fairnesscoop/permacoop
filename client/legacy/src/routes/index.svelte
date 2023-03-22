<script>
  import { _ } from 'svelte-i18n';
  import { stores } from '@sapper/app';
  import { get } from 'utils/axios';
  import { onMount } from 'svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import Link from 'components/links/Link.svelte';

  const { session } = stores();

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
        params: { page: 1, status: 'pending' },
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
  <h3
    class="my-3 inline-flex text-xl font-semibold text-gray-700 dark:text-gray-200">
    {$_('human_resources.leaves.requests.title')}
  </h3>
  <div class="lg:flex items-center mb-6">
    {#if response.totalItems > 1}
      <p class="text-gray-700 dark:text-gray-300">
        <strong>{response.totalItems}</strong>
        {$_('dashboard.leave_requests.pending.plural')}
      </p>
      <Link
        href={'/human_resources/leaves/requests'}
        value={$_('human_resources.leaves.requests.title')} />
    {:else if response.totalItems === 1}
      <p class="text-gray-700 dark:text-gray-300">
        <strong>{response.totalItems}</strong>
        {$_('dashboard.leave_requests.pending.singular')}
      </p>

      <Link
        href={'/human_resources/leaves/requests'}
        value={$_('human_resources.leaves.requests.title')} />
    {:else}
      <p class="text-gray-700 dark:text-gray-300">
        {$_('dashboard.leave_requests.none')}
      </p>
    {/if}
  </div>
{/if}
