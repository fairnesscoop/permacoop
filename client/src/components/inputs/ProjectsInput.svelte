<script>
  import { _ } from 'svelte-i18n';

  export let projectId;
  export let projects = [];
</script>

<div class="block mt-4 text-sm">
  <label for="customerId" class="text-gray-700 dark:text-gray-400">
    Projet
  </label>
  <select
    id="customerId"
    bind:value="{projectId}"
    class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
    <option value="">{$_('crm.projects.form.project_placeholder')}</option>
    {#each projects as { id, customer, name }}
      <option value="{id}" selected="{projectId === id}">
        {name}
        ({customer.name})
      </option>
    {/each}
  </select>
</div>
