<script>
  export let task;
</script>

<tr>
  <td>{task.name}</td>
  <td>
    <a class="btn btn-outline-secondary btn-sm" href={`/tasks/${task.id}/edit`}>
      Modifier
    </a>
  </td>
</tr>
