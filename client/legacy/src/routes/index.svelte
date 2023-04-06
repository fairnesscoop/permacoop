<script>
  import { _ } from 'svelte-i18n';
  import { stores } from '@sapper/app';
  import { get } from 'utils/axios';
  import { errorNormalizer } from 'normalizer/errors';
  import Link from 'components/links/Link.svelte';

  const { session } = stores();

  let errors = null;

  const fetchPendingLeaveRequestsCount = async () => {
    try {
      const response = await get('leave-requests/pending-count');
      return response.data;
    } catch (e) {
      errors = errorNormalizer(e);
      return 0;
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

  {#await fetchPendingLeaveRequestsCount() then numPendingLeaveRequests}
    <div class="lg:flex items-center mb-6">
      <p class="text-gray-700 dark:text-gray-300">
        {$_('dashboard.leave_requests.pending', { values: { count: numPendingLeaveRequests } })}
      </p>
      {#if numPendingLeaveRequests > 0}
      <Link
        href={'/human_resources/leaves/requests'}
        value={$_('human_resources.leaves.requests.see_all.title')} />
      {/if}
    </div>
  {/await}
{/if}
