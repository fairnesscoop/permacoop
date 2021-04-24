<script>
  export let href;
  export let value;
</script>

<a
  {href}
  class="ml-2 mb-6 px-2 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
  {value}
  <span class="ml-2" aria-hidden="true">+</span>
</a>
