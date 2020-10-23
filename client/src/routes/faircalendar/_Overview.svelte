<script>
  import GreenBadge from '../../components/badges/GreenBadge.svelte';
  import OrangeBadge from '../../components/badges/OrangeBadge.svelte';
  import IndigoBadge from '../../components/badges/OrangeBadge.svelte';
  import BlueBadge from '../../components/badges/BlueBadge.svelte';
  import GrayBadge from '../../components/badges/GrayBadge.svelte';
  import YellowBadge from '../../components/badges/YellowBadge.svelte';
  import RedBadge from '../../components/badges/RedBadge.svelte';

  export let overview;
</script>

<div class="px-3 py-3 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <h4 class="text-lg mb-2 font-semibold text-gray-600 dark:text-gray-300">
    Récapitulatif
  </h4>
  <table class="w-full whitespace-no-wrap">
    <thead>
      <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
        <th class="text-center py-3">Mission</th>
        <th class="text-center py-3">Support // Podcast</th>
        <th class="text-center py-3">Dojo</th>
        <th class="text-center py-3">Formation // Conf // Meetup</th>
        <th class="text-center py-3">Vacances</th>
        <th class="text-center py-3">Congé maladie</th>
        <th class="text-center py-3">Autres</th>
        <th class="text-center py-3">Tickets resto</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="py-3 text-center text-sm"><GreenBadge value={`${overview.mission} j`} /></td>
        <td class="py-3 text-center text-sm"><IndigoBadge value={`${overview.support} j`} /></td>
        <td class="py-3 text-center text-sm"><BlueBadge value={`${overview.dojo} j`}/></td>
        <td class="py-3 text-center text-sm"><YellowBadge value={`${overview.formationConference} j`}/></td>
        <td class="py-3 text-center text-sm"><OrangeBadge value={`${overview.holiday} j`} /></td>
        <td class="py-3 text-center text-sm"><RedBadge value={`${overview.medicalLeave} j`} /></td>
        <td class="py-3 text-center text-sm"><GrayBadge value={`${overview.other} j`} /></td>
        <td class="py-3 text-center text-sm"><b>{overview.mealTicket}</b></td>
      </tr>
    </tbody>
  </table>
</div>
