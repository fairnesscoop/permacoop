<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import UsersInput from '../../../components/inputs/UsersInput.svelte';
  import CustomersInput from '../../../components/inputs/CustomersInput.svelte';
  import TasksInput from '../../../components/inputs/TasksInput.svelte';
  import { get } from '../../../utils/axios';
  import MoneyInput from '../../../components/inputs/MoneyInput.svelte';

  const { session } = stores();
  const token = $session.user.apiToken;

  let users = [];
  let tasks = { items: [] };
  let customers = { items: [] };

  onMount(async () => {
    const [customerResponse, taskResponse, userResponse] = await Promise.all([
      get('customers', { params: { page: 1 } }, token),
      get('tasks', { params: { page: 1 } }, token),
      get('users', {}, token),
    ]);

    users = userResponse.data;
    tasks = taskResponse.data;
    customers = customerResponse.data;
  });

  export let amount = '';
  export let customerId = '';
  export let taskId = '';
  export let userId = '';

  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', { amount, taskId, userId, customerId });
  };
</script>

<form on:submit|preventDefault="{submit}">
  <CustomersInput customers="{customers.items}" bind:customerId />
  <UsersInput users="{users}" bind:userId />
  <TasksInput tasks="{tasks.items}" bind:taskId />
  <MoneyInput label="{'Taux HT'}" bind:value="{amount}" />
  <button
    type="submit"
    class="btn btn-primary"
    disabled="{!taskId || !customerId || !userId || !amount}"
  >
    Enregistrer
  </button>
</form>
