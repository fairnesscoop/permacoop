<script>
  import { _ } from 'svelte-i18n';
  import { format } from 'normalizer/money';

  export let items;
</script>

<table
  class="w-full px-4 py-3 mb-8 whitespace-no-wrap bg-white rounded-lg shadow-md dark:bg-gray-800">
  <thead>
    <tr
      class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('human_resources.payslips.user')}</th>
      <th class="px-4 py-3">{$_('human_resources.payslips.contract')}</th>
      <th class="px-4 py-3">{$_('human_resources.payslips.joining_date')}</th>
      <th class="px-4 py-3">{$_('human_resources.payslips.annual_earnings')}</th>
      <th class="px-4 py-3">{$_('human_resources.payslips.monthly_earnings')}</th>
      <th class="px-4 py-3">{$_('human_resources.payslips.working_time')}</th>
      <th class="px-4 py-3">{$_('human_resources.payslips.transport_fee')}</th>
      <th class="px-4 py-3">{$_('human_resources.payslips.meal_tickets')}</th>
      <th class="px-4 py-3">{$_('human_resources.payslips.health_insurance')}</th>
      <th class="px-4 py-3">{$_('human_resources.payslips.paid_leaves')}</th>
      <th class="px-4 py-3">{$_('human_resources.payslips.unpaid_leaves')}</th>
      <th class="px-4 py-3">{$_('human_resources.payslips.sick_leaves')}</th>
      <th class="px-4 py-3">{$_('human_resources.payslips.exceptional_leaves')}</th>
    </tr>
  </thead>

  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as { firstName, lastName, contract, isExecutivePosition, joiningDate,
                      annualEarnings, monthlyEarnings, workingTime, transportFee, mealTickets,
                      healthInsurance, paidLeaves, unpaidLeaves, sickLeaves, exceptionalLeaves }}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">
          {firstName} {lastName}
        </td>
        <td class="px-4 py-3 text-sm">{contract} {isExecutivePosition ? $_('human_resources.payslips.executive_position') : ''}</td>
        <td class="px-4 py-3 text-sm">{joiningDate}</td>
        <td class="px-4 py-3 text-sm">{format(annualEarnings)}</td>
        <td class="px-4 py-3 text-sm">{format(monthlyEarnings)}</td>
        <td class="px-4 py-3 text-sm">{$_(`human_resources.users.form.working_time.${workingTime}`)}</td>
        <td class="px-4 py-3 text-sm">{format(transportFee)}</td>
        <td class="px-4 py-3 text-sm">{mealTickets}</td>
        <td class="px-4 py-3 text-sm">{$_(`common.${healthInsurance}`)}</td>
        <td class="px-4 py-3 text-sm">{paidLeaves}</td>
        <td class="px-4 py-3 text-sm">{unpaidLeaves}</td>
        <td class="px-4 py-3 text-sm">{sickLeaves}</td>
        <td class="px-4 py-3 text-sm">{exceptionalLeaves}</td>
      </tr>
    {/each}
  </tbody>
</table>
