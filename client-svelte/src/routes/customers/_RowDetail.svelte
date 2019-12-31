<script>
  export let customer;
</script>

<tr>
  <td>{customer.name}</td>
  <td>
    <a
      class="btn btn-outline-secondary btn-sm"
      href={`/customers/${customer.id}/edit`}>
      Modifier
    </a>
  </td>
</tr>
