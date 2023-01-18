<script>
  export let loading;
  export let disabled = false;
  export let name = 'submit';
  export let value;

  $: className =
    `block w-full px-4 py-2 mt-6 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple ${disabled && 'opacity-50 cursor-auto'}`;
</script>

<button {name} type="submit" class={className} disabled={loading || disabled}>
  {value}
  {#if loading}...{/if}
</button>
