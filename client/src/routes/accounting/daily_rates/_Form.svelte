<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher, onMount } from 'svelte';
  import { get } from '../../../utils/axios';
  import UsersInput from '../../../components/inputs/UsersInput.svelte';
  import CustomersInput from '../../../components/inputs/CustomersInput.svelte';
  import TasksInput from '../../../components/inputs/TasksInput.svelte';
  import Input from '../../../components/inputs/Input.svelte';
  import Button from '../../../components/inputs/Button.svelte';

  let users = [];
  let tasks = {items: []};
  let customers = {items: []};

  onMount(async () => {
    const [customerResponse, taskResponse, userResponse] = await Promise.all([
      get('customers', {params: {page: 1}}),
      get('tasks', {params: {page: 1}}),
      get('users')
    ]);

    users = userResponse.data;
    tasks = taskResponse.data;
    customers = customerResponse.data;
  });

  export let amount = '';
  export let customerId = '';
  export let taskId = '';
  export let userId = '';
  export let loading;

  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', {amount, taskId, userId, customerId});
  };
</script>

<form on:submit|preventDefault={submit} class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <CustomersInput customers={customers.items} bind:customerId />
  <UsersInput {users} bind:userId />
  <TasksInput tasks={tasks.items} bind:taskId />
  <Input type={'money'} label={$_('accounting.daily_rates.form.daily_rate')} bind:value={amount} />
  <Button value={$_('common.form.save')} {loading} disabled={!taskId || !customerId || !userId || !amount || loading} />
</form>
