<script>
  import {createEventDispatcher, onMount} from 'svelte';
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

  export let amount = 600;
  export let customerId = '';
  export let taskId = '';
  export let userId = '';

  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', {amount, taskId, userId, customerId});
  };
</script>

<form on:submit|preventDefault={submit}>
  <div class="form-group">
    <label for="userId">Coopérateur *</label>
    <select
      id="userId"
      required="required"
      class="form-control"
      bind:value={userId}>
      <option value="">-- Choisir un coopérateur --</option>
      {#each users as user}
        <option value={user.id} selected={userId === user.id}>
          {`${user.firstName} ${user.lastName}`}
        </option>
      {/each}
    </select>
  </div>
  <div class="form-group">
    <label for="customerId">Client *</label>
    <select
      id="customerId"
      required="required"
      class="form-control"
      bind:value={customerId}>
      <option value="">-- Choisir un client --</option>
      {#each customers as customer}
        <option value={customer.id} selected={customerId === customer.id}>
          {customer.name}
        </option>
      {/each}
    </select>
  </div>
  <div class="form-group">
    <label for="taskId">Mission *</label>
    <select
      id="taskId"
      required="required"
      class="form-control"
      bind:value={taskId}>
      <option value="">-- Choisir une mission --</option>
      {#each tasks as task}
        <option value={task.id} selected={taskId === task.id}>
          {task.name}
        </option>
      {/each}
    </select>
  </div>
  <div class="form-group">
    <label for="amount">Montant HT *</label>
    <input
      type="number"
      required="required"
      min="1"
      id="amount"
      step="any"
      bind:value={amount}
      class="form-control" />
  </div>
  <button
    type="submit"
    class="btn btn-primary"
    disabled={!taskId || !customerId || !userId || !amount}>
    Sauvegarder
  </button>
</form>
