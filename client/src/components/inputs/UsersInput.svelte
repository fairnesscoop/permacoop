<script>
  export let userId;
  export let users = [];
</script>

<div class="form-group">
  <label for="userId">Utilisateur *</label>
  <select
    id="userId"
    required="required"
    class="form-control"
    bind:value={userId}>
    <option value="">-- Choisir un utilisateur --</option>
    {#each users as user}
      <option value={user.id} selected={userId === user.id}>
        {`${user.firstName} ${user.lastName}`}
      </option>
    {/each}
  </select>
</div>
