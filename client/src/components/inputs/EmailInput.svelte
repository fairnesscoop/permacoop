<script>
  import shortid from '../../utils/shortid';

  export let value;
  export let label;
  export let required = 'required';

  const id = shortid.generate();
</script>

<div class="form-group">
  <label class={required} for={id}>{label}</label>
  <input type="email" {id} {required} bind:value class="form-control" />
</div>
