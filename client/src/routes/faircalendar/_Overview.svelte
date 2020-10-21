<script>
  import GreenBadge from '../../components/badges/GreenBadge.svelte';

  export let overview;
</script>

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
      <th class="text-center py-3">Nb. tickets resto</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    <tr class="text-gray-700 dark:text-gray-400">
      <td class="py-3 text-center text-sm">{overview.mission} j</td>
      <td class="py-3 text-center text-sm">{overview.support} j</td>
      <td class="py-3 text-center text-sm">{overview.dojo} j</td>
      <td class="py-3 text-center text-sm">{overview.formationConference} j</td>
      <td class="py-3 text-center text-sm">{overview.holiday} j</td>
      <td class="py-3 text-center text-sm">{overview.medicalLeave} j</td>
      <td class="py-3 text-center text-sm">{overview.other} j</td>
      <td class="py-3 text-center text-sm">
        <GreenBadge value={overview.mealTicket} />
      </td>
    </tr>
  </tbody>
</table>
