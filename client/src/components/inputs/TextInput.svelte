<script>
  import shortid from 'shortid';

  export let value;
  export let label;
  export let required = 'required';

  const id = shortid.generate();
</script>

<div class="form-group">
  <label for={id} class={required}>{label}</label>
  <input type="text" {id} {required} bind:value class="form-control" />
</div>
