<script>
  export let projectId;
  export let projects = [];
</script>

<div class="form-group">
  <label for="projectId" class="required">Projet</label>
  <select
    id="projectId"
    required="required"
    class="form-control"
    bind:value={projectId}>
    <option value="">-- Choisir un projet --</option>
    {#each projects as project}
      <option value={project.id} selected={projectId === project.id}>
        {project.name} ({project.customer.name})
      </option>
    {/each}
  </select>
</div>
