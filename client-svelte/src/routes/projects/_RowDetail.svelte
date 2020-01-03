<script>
  export let project;
</script>

<tr>
  <td>
    <b>[{project.customer.name}]</b>
    {project.name}
  </td>
  <td>
    <a
      class="btn btn-outline-secondary btn-sm"
      href={`/projects/${project.id}/edit`}>
      Modifier
    </a>
  </td>
</tr>
