<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { get } from 'utils/axios';
  import { format } from 'date-fns';
  import MonthsInput from 'components/inputs/MonthsInput.svelte';

  const dispatch = createEventDispatcher();

  export let userId;
  export let date;

  let data = [];

  onMount(async () => {
    ({ data } = await get('users'));
  });

  const handleFilter = () => {
    const filters = {
      userId,
      date: format(new Date(date), 'yyyy-MM-dd'),
    };

    const uri = new URLSearchParams(filters).toString();
    window.history.pushState({}, null, `/faircalendar?${uri}`);

    dispatch('filter', { ...filters, date: new Date(date) });
  };
</script>

<form class="px-3 py-3 mb-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <h4 class="text-lg font-semibold text-gray-600 dark:text-gray-300">
    {$_('faircalendar.filter.title')}
  </h4>
  <div class="text-sm text-gray-600 dark:text-gray-400">
    <div class="flex">
      <div class="w-1/2 pr-2">
        <MonthsInput
          label={$_('faircalendar.filter.month')}
          amount={6}
          bind:date
          on:change={handleFilter} />
      </div>
      <div class="w-1/2 pl-2">
        <div class="block mt-4 text-sm">
          <label
            for="userId"
            class="text-gray-700 dark:text-gray-400">{$_('faircalendar.filter.user')}</label>
          <select
            id="userId"
            class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
            bind:value={userId}
            on:blur={handleFilter}
            on:change={handleFilter}>
            {#each data as user}
              <option value={user.id} selected={user.id === userId}>
                {`${user.firstName} ${user.lastName}`}
              </option>
            {/each}
          </select>
        </div>
      </div>
    </div>
  </div>
</form>
