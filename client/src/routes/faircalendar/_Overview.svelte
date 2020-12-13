<script>
  import { _ } from 'svelte-i18n';
  import GreenBadge from '../../components/badges/GreenBadge.svelte';
  import OrangeBadge from '../../components/badges/OrangeBadge.svelte';
  import IndigoBadge from '../../components/badges/IndigoBadge.svelte';
  import BlueBadge from '../../components/badges/BlueBadge.svelte';
  import GrayBadge from '../../components/badges/GrayBadge.svelte';
  import YellowBadge from '../../components/badges/YellowBadge.svelte';
  import RedBadge from '../../components/badges/RedBadge.svelte';

  export let overview;
</script>

<div class="px-3 py-3 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <h4 class="text-lg mb-2 font-semibold text-gray-600 dark:text-gray-300">
    {$_('faircalendar.summary')}
  </h4>
  <table class="w-full whitespace-no-wrap">
    <thead>
      <tr
        class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
        <th class="text-center py-3">{$_('faircalendar.type.mission')}</th>
        <th class="text-center py-3">{$_('faircalendar.type.support')}</th>
        <th class="text-center py-3">{$_('faircalendar.type.dojo')}</th>
        <th class="text-center py-3">
          {$_('faircalendar.type.formationConference')}
        </th>
        <th class="text-center py-3">{$_('faircalendar.type.leave')}</th>
        <th class="text-center py-3">{$_('faircalendar.type.other')}</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="py-3 text-center text-sm">
          <GreenBadge
            value="{$_('common.days_duration', {
              values: { n: overview.mission },
            })}" />
        </td>
        <td class="py-3 text-center text-sm">
          <IndigoBadge
            value="{$_('common.days_duration', {
              values: { n: overview.support },
            })}" />
        </td>
        <td class="py-3 text-center text-sm">
          <BlueBadge
            value="{$_('common.days_duration', {
              values: { n: overview.dojo },
            })}" />
        </td>
        <td class="py-3 text-center text-sm">
          <OrangeBadge
            value="{$_('common.days_duration', {
              values: { n: overview.formationConference },
            })}" />
        </td>
        <td class="py-3 text-center text-sm">
          <YellowBadge
            value="{$_('common.days_duration', {
              values: { n: overview.leave },
            })}" />
        </td>
        <td class="py-3 text-center text-sm">
          <GrayBadge
            value="{$_('common.days_duration', {
              values: { n: overview.other },
            })}" />
        </td>
      </tr>
    </tbody>
  </table>
</div>
