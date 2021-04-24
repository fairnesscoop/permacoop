<script>
  import { _ } from 'svelte-i18n';

  export let taskId;
  export let tasks = [];
</script>

<div class="block mt-4 text-sm">
  <label for="taskId" class="text-gray-700 dark:text-gray-400">
    {$_('accounting.tasks.form.task')}
  </label>
  <select
    id="taskId"
    bind:value={taskId}
    class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
    <option value="">{$_('accounting.tasks.form.task_placeholder')}</option>
    {#each tasks as task}
      <option value={task.id} selected={taskId === task.id}>{task.name}</option>
    {/each}
  </select>
</div>
