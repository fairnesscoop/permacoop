<script>
  import shortid from 'shortid';

  export let value;
  export let label;
  export let required = 'required';

  const id = shortid.generate();
</script>

<div class="form-group">
  <label class={required} for={id}>{label}</label>
  <div class="input-group">
    <input
      type="number"
      {required}
      min="0"
      {id}
      placeholder="0,00"
      step="0.01"
      bind:value
      class="form-control" />
    <div class="input-group-append">
      <span class="input-group-text">€</span>
    </div>
  </div>
</div>
