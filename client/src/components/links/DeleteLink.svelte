<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import TrashIcon from '../icons/TrashIcon.svelte';

  export let confirmMessage = 'common.confirm.remove';
  const dispatch = createEventDispatcher();

  const handleClick = () => {
    if (confirm($_(confirmMessage))) {
      dispatch('confirm');
    }
  };
</script>

<button
  on:click={handleClick}
  class="flex items-center justify-between px-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
  aria-label={$_('common.form.remove')}>
  <TrashIcon className={'w-5 h-5'} />
</button>
