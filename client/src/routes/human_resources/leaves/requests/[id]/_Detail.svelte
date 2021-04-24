<script>
  import { _ } from 'svelte-i18n';
  import { format } from 'date-fns';
  import { fr } from 'date-fns/locale';

  export let leaveRequest;

  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy', { locale: fr });
  };
</script>

<table class="w-full whitespace-no-wrap">
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#if 'pending' !== leaveRequest.status && leaveRequest.moderator}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">
          {$_('human_resources.leaves.requests.moderate_by')}
        </td>
        <td class="px-4 py-3 text-sm">
          {leaveRequest.moderator.firstName}
          {leaveRequest.moderator.lastName}
          {#if leaveRequest.moderationComment}
            <em>&laquo;{leaveRequest.moderationComment}&raquo;</em>
          {/if}
        </td>
      </tr>
    {/if}
    <tr class="text-gray-700 dark:text-gray-400">
      <td class="px-4 py-3 text-sm">
        {$_('human_resources.leaves.requests.status')}
      </td>
      <td class="px-4 py-3 text-sm">
        {$_(`human_resources.leaves.requests.states.${leaveRequest.status}`)}
      </td>
    </tr>
    <tr class="text-gray-700 dark:text-gray-400">
      <td class="px-4 py-3 text-sm">
        {$_('human_resources.leaves.requests.leave_type.title')}
      </td>
      <td class="px-4 py-3 text-sm">
        {$_(`human_resources.leaves.requests.leave_type.${leaveRequest.type}`)}
      </td>
    </tr>
    <tr class="text-gray-700 dark:text-gray-400">
      <td class="px-4 py-3 text-sm">
        {$_('human_resources.leaves.requests.start_date')}
      </td>
      <td class="px-4 py-3 text-sm">
        {formatDate(leaveRequest.startDate)}
        {#if leaveRequest.startsAllDay}
          -
          <em>{$_('human_resources.leaves.requests.all_day')}</em>
        {/if}
      </td>
    </tr>
    <tr class="text-gray-700 dark:text-gray-400">
      <td class="px-4 py-3 text-sm">
        {$_('human_resources.leaves.requests.end_date')}
      </td>
      <td class="px-4 py-3 text-sm">
        {formatDate(leaveRequest.endDate)}
        {#if leaveRequest.endsAllDay}
          -
          <em>{$_('human_resources.leaves.requests.all_day')}</em>
        {/if}
      </td>
    </tr>
    <tr class="text-gray-700 dark:text-gray-400">
      <td class="px-4 py-3 text-sm">
        {$_('human_resources.leaves.requests.duration')}
      </td>
      <td class="px-4 py-3 text-sm">
        {$_('common.days_duration', { values: { n: leaveRequest.duration } })}
      </td>
    </tr>
    {#if leaveRequest.comment}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">
          {$_('human_resources.leaves.requests.comment')}
        </td>
        <td class="px-4 py-3 text-sm">{leaveRequest.comment}</td>
      </tr>
    {/if}
  </tbody>
</table>
