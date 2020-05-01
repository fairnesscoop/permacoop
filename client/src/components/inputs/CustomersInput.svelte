<script>
  export let customerId;
  export let customers = [];
</script>

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
