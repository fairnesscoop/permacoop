<script>
  import { stores } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import { format as dateFormat } from 'date-fns';
  import EditLink from '../../../components/links/EditLink.svelte';
  import { format } from '../../../normalizer/money';
  import { ROLE_ACCOUNTANT } from '../../../constants/roles';

  const { session } = stores();

  export let items;
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr
      class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('human_resources.users.user')}</th>
      <th class="px-4 py-3">{$_('human_resources.users.role')}</th>
      <th class="px-4 py-3">{$_('human_resources.users.contract')}</th>
      <th class="px-4 py-3">{$_('human_resources.users.joining_date')}</th>
      <th class="px-4 py-3">{$_('human_resources.users.earning.title')}</th>
      <th class="px-4 py-3">{$_('human_resources.users.transport_fee')}</th>
      <th class="px-4 py-3">{$_('human_resources.users.health_insurance')}</th>
      <th class="px-4 py-3">{$_('common.actions')}</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as { id, firstName, lastName, email, role, userAdministrative } (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{firstName} {lastName}</td>
        <td class="px-4 py-3 text-sm">{$_(`common.roles.${role}`)}</td>
        <td class="px-4 py-3 text-sm">
          {$_(`human_resources.users.form.contract.${userAdministrative.contract}`)}
          {#if userAdministrative.executivePosition}
            ({$_('human_resources.users.executive_position')})
          {/if}
        </td>
        <td class="px-4 py-3 text-sm">{dateFormat(new Date(userAdministrative.joiningDate), 'dd/MM/yyyy')}</td>
        <td class="px-4 py-3 text-sm">
          {$_('human_resources.users.earning.annual', { values: { amount: format(userAdministrative.annualEarnings)}})}
          <br/>
          {$_('human_resources.users.earning.monthly', { values: { amount: format(userAdministrative.annualEarnings / 12)}})}
        </td>
        <td class="px-4 py-3 text-sm">
          {#if userAdministrative.transportFee}
            {format(userAdministrative.transportFee)}
          {/if}
        </td>
        <td class="px-4 py-3 text-sm">
          {#if userAdministrative.healthInsurance}
            {$_('common.yes')}
          {:else}
            {$_('common.no')}
          {/if}
        </td>
        <td class="px-4 py-3">
          {#if $session.user && $session.user.role !== ROLE_ACCOUNTANT}
            <div class="flex items-center space-x-4 text-sm">
              <EditLink href={`/human_resources/users/${id}/edit`} />
            </div>
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
