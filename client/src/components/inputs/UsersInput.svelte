<script>
  import { _ } from 'svelte-i18n';

  export let userId;
  export let users = [];
</script>

<div class="block mt-4 text-sm">
  <label for="userId" class="text-gray-700 dark:text-gray-400">
    {$_('human_resources.users.form.user')}
  </label>
  <select
    id="userId"
    bind:value="{userId}"
    class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
    <option value="">
      {$_('human_resources.users.form.user_placeholder')}
    </option>
    {#each users as user}
      <option value="{user.id}" selected="{userId === user.id}">
        {`${user.firstName} ${user.lastName}`}
      </option>
    {/each}
  </select>
</div>
