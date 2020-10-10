<script>
  import PencilIcon from '../../../components/icons/PencilIcon.svelte';

  export let users;
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">Prénom</th>
      <th class="px-4 py-3">Nom</th>
      <th class="px-4 py-3">Email</th>
      <th class="px-4 py-3">Rôle</th>
      <th class="px-4 py-3">Actions</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each users as {id, firstName, lastName, email, role} (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{firstName}</td>
        <td class="px-4 py-3 text-sm">{lastName}</td>
        <td class="px-4 py-3 text-sm">{email}</td>
        <td class="px-4 py-3 text-sm">{role}</td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-4 text-sm">
            <a href={`/human_resources/users/${id}/edit`} class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Modifier">
              <PencilIcon className={'w-5 h-5'} />
            </a>
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
