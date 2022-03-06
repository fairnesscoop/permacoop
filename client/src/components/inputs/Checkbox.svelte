<script>
  import shortid from '../../utils/shortid';
  export let label;

  export let checked = false;
  export let name = `checkbox-${shortid()}`;
  const className = 'block w-full text-sm  focus:border-purple-400';
</script>

<div class={`block mt-4 text-sm ${className}`}>
  <input bind:checked type="checkbox" id={name} {name} />
  <label class="text-gray-700 dark:text-gray-400" for={name}> {label}</label>
</div>
