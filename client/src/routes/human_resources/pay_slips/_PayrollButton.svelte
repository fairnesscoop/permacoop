<script>
  import { _ } from 'svelte-i18n';

  export let disabled;
</script>

<button
  {disabled}
  on:click
  class="ml-2 mb-6 px-2 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
  {$_('human_resources.pay_slips.download_payroll_elements')}
</button>
