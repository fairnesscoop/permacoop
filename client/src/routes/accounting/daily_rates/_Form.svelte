<script>
  import {createEventDispatcher, onMount} from 'svelte';
  import UsersInput from '../../_components/inputs/UsersInput.svelte';
  import CustomersInput from '../../_components/inputs/CustomersInput.svelte';
  import TasksInput from '../../_components/inputs/TasksInput.svelte';
  import {client as axios} from '../../../utils/axios';

  let users = [];
  let tasks = [];
  let customers = [];

  onMount(async () => {
    const [customerResponse, taskResponse, userResponse] = await Promise.all([
      axios.get('customers'),
      axios.get('tasks'),
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
  <UsersInput {users} bind:userId />
  <CustomersInput {customers} bind:customerId />
  <TasksInput {tasks} bind:taskId />
  <div class="form-group">
    <label for="amount">Taux HT *</label>
    <div class="input-group">
      <input
        type="number"
        required="required"
        min="1"
        id="amount"
        placeholder="0,00"
        step="0.01"
        bind:value={amount}
        class="form-control" />
      <div class="input-group-append">
        <span class="input-group-text">€</span>
      </div>
    </div>
  </div>
  <button
    type="submit"
    class="btn btn-primary"
    disabled={!taskId || !customerId || !userId || !amount}>
    Enregistrer
  </button>
</form>
