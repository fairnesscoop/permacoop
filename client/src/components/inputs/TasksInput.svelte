<script>
  export let taskId;
  export let tasks = [];
</script>

<div class="form-group">
  <label for="taskId" class="required">Mission</label>
  <select
    id="taskId"
    required="required"
    class="form-control"
    bind:value="{taskId}">
    <option value="">-- Choisir une mission --</option>
    {#each tasks as task}
      <option value="{task.id}" selected="{taskId === task.id}">
        {task.name}
      </option>
    {/each}
  </select>
</div>
