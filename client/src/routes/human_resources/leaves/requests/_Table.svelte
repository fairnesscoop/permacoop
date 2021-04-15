<script>
  import { stores } from '@sapper/app';
  import { format } from 'date-fns';
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';
  import SeeLink from 'components/links/SeeLink.svelte';
  import RedBadge from 'components/badges/RedBadge.svelte';
  import OrangeBadge from 'components/badges/OrangeBadge.svelte';
  import GrayBadge from 'components/badges/GrayBadge.svelte';
  import DeleteLink from 'components/links/DeleteLink.svelte';

  export let items;

  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };

  const dispatch = createEventDispatcher();
  const { session } = stores();
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr
      class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('human_resources.leaves.requests.user')}</th>
      <th class="px-4 py-3">{$_('human_resources.leaves.requests.periods')}</th>
      <th class="px-4 py-3">{$_('human_resources.leaves.requests.leave_type.title')}</th>
      <th class="px-4 py-3">{$_('human_resources.leaves.requests.status')}</th>
      <th class="px-4 py-3">{$_('common.actions')}</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as { id, startDate, endDate, user, status, duration, type } (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{user.firstName} {user.lastName}</td>
        <td class="px-4 py-3 text-sm">
          {$_('human_resources.leaves.requests.period', {
            values: {
              from: formatDate(startDate),
              to: formatDate(endDate),
            },
          })}
          <GrayBadge
            value="{$_('common.days_duration', { values: { n: duration } })}" />
        </td>
        <td class="px-4 py-3 text-sm">
          {$_(`human_resources.leaves.requests.leave_type.${type}`)}
        </td>
        <td class="px-4 py-3 text-sm">
          {#if 'pending' === status}
            <OrangeBadge
              value="{$_(`human_resources.leaves.requests.states.${status}`)}" />
          {:else}
            <RedBadge
              value="{$_(`human_resources.leaves.requests.states.${status}`)}" />
          {/if}
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-4 text-sm">
            <SeeLink href={`/human_resources/leaves/requests/${id}`} />
            {#if $session.user && $session.user.id === user.id}
              <DeleteLink 
                on:confirm={() => dispatch('delete', id)} 
                confirmMessage={$_("human_resources.leaves.requests.confirm")} />
            {/if}
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
