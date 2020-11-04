<script>
  import { _ } from 'svelte-i18n';
  import EyeEcon from '../icons/EyeIcon.svelte';

  export let href;
</script>

<a
  href="{href}"
  class="flex items-center justify-between px-2 py-1 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
  aria-label="{$_('common.form.edit')}">
  <EyeEcon className="{'w-5 h-5'}" />
</a>
