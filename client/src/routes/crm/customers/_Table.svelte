<script>
  import PencilIcon from '../../../components/icons/PencilIcon.svelte';
  import EyeIcon from '../../../components/icons/EyeIcon.svelte';
  import {byAlpha2} from 'iso-country-codes';

  export let items;
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">Clients</th>
      <th class="px-4 py-3">Adresses</th>
      <th class="px-4 py-3">Actions</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as {id, name, address} (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{name}</td>
        <td class="px-4 py-3 text-sm">
          {address.street}
          <br />
          {address.zipCode} {address.city}
          <br />
          {byAlpha2[address.country].name}
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-4 text-sm">
            <a href={`/crm/customers/${id}`} class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Modifier">
              <EyeIcon className={'w-5 h-5'} />
            </a>
            <a href={`/crm/customers/${id}/edit`} class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Modifier">
              <PencilIcon className={'w-5 h-5'} />
            </a>
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
