<script>
  import shortid from '../../utils/shortid';

  export let value;
  export let label;
  export let required = 'required';

  const id = shortid.generate();
</script>

<div class="block mt-4 text-sm">
  <label class="text-gray-700 dark:text-gray-400" for={id}>{label}</label>
  <select
    {id}
    {required}
    class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
    bind:value>
    <slot />
  </select>
</div>
