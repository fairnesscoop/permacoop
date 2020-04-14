<script>
  export let project;
</script>

<tr>
  <td>{project.name}</td>
  <td>{project.customer.name}</td>
  <td>
    <a
      class="btn btn-outline-secondary btn-sm"
      href={`/projects/${project.id}/edit`}>
      Modifier
    </a>
  </td>
</tr>
