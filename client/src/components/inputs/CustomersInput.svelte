<script>
  import { _ } from 'svelte-i18n';

  export let customerId;
  export let customers = [];
</script>

<div class="block mt-4 text-sm">
  <label for="customerId" class="text-gray-700 dark:text-gray-400">
    Client
  </label>
  <select id="customerId" bind:value={customerId} class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
    <option value="">{$_('crm.customers.form.customer_placeholder')}</option>
    {#each customers as {id, name}}
      <option value={id} selected={customerId === id}>
        {name}
      </option>
    {/each}
  </select>
</div>
