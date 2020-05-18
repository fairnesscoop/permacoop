<script>
  import {createEventDispatcher, onMount} from 'svelte';
  import UsersInput from '../../../components/inputs/UsersInput.svelte';
  import CustomersInput from '../../../components/inputs/CustomersInput.svelte';
  import TasksInput from '../../../components/inputs/TasksInput.svelte';
  import {client as axios} from '../../../utils/axios';
  import MoneyInput from '../../../components/inputs/MoneyInput.svelte';

  let users = [];
  let tasks = {items: []};
  let customers = {items: []};

  onMount(async () => {
    const [customerResponse, taskResponse, userResponse] = await Promise.all([
      axios.get('customers', {params: {page: 1}}),
      axios.get('tasks', {params: {page: 1}}),
      axios.get('users')
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
    dispatch('save', {amount, taskId, userId, customerId});
  };
</script>

<form on:submit|preventDefault={submit}>
  <CustomersInput customers={customers.items} bind:customerId />
  <UsersInput {users} bind:userId />
  <TasksInput tasks={tasks.items} bind:taskId />
  <MoneyInput label={'Taux HT'} bind:value={amount} />
  <button
    type="submit"
    class="btn btn-primary"
    disabled={!taskId || !customerId || !userId || !amount}>
    Enregistrer
  </button>
</form>
