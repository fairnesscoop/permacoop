<script>
  import { _ } from 'svelte-i18n';
  import PencilIcon from '../icons/PencilIcon.svelte';

  export let href;
</script>

<a
  {href}
  class="flex items-center justify-between px-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
  aria-label={$_('common.form.edit')}>
  <PencilIcon className={'w-5 h-5'} />
</a>
