<script>
  import {format} from 'date-fns';
  import {fr} from 'date-fns/locale';
  import EyeIcon from '../../../components/icons/EyeIcon.svelte';
  import RedBadge from '../../../components/badges/RedBadge.svelte';
  import OrangeBadge from '../../../components/badges/OrangeBadge.svelte';
  import GreenBadge from '../../../components/badges/GreenBadge.svelte';
  import GrayBadge from '../../../components/badges/GrayBadge.svelte';

  export let items;
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">Salarié</th>
      <th class="px-4 py-3">Période</th>
      <th class="px-4 py-3">Type de congé</th>
      <th class="px-4 py-3">Statut</th>
      <th class="px-4 py-3">Actions</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as {id, startDate, endDate, user, status, duration, leaveType} (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{user.firstName} {user.lastName}</td>
        <td class="px-4 py-3 text-sm">
          Du {format(new Date(startDate), 'dd/MM/yyyy', {locale: fr})}
          au {format(new Date(endDate), 'dd/MM/yyyy', {locale: fr})}
          <GrayBadge value={`${duration} jours`}/>
        </td>
        <td class="px-4 py-3 text-sm">{leaveType}</td>
        <td class="px-4 py-3 text-sm">
          {#if 'pending' === status}
            <OrangeBadge value={status}/>
          {:else if 'accepted' === status}
            <GreenBadge value={status}/>
          {:else}
            <RedBadge value={status}/>
          {/if}
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-4 text-sm">
            <a href={`/human_resources/holidays/${id}`} class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Modifier">
              <EyeIcon className={'w-5 h-5'} />
            </a>
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
