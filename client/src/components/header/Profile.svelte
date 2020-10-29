<script>
  import { _ } from 'svelte-i18n';
  import { slide } from 'svelte/transition';
  import Cookies from 'js-cookie';
  import { stores, goto } from '@sapper/app';
  import UserIcon from '../icons/UserIcon.svelte';
  import LogoutIcon from '../icons/LogoutIcon.svelte';

  let open = false;

  const { session } = stores();
  const handleLogout = async () => {
    $session.user = null;
    Cookies.remove('permacoop_token');
    goto('/login');
    await fetch('/proxy/session', {method: 'DELETE'});
  };
</script>

<svelte:window on:click={(e) => {
  if (e.target.id !== 'profile-dropdown') {
    open = false;
  }
}}/>

{#if $session.user}
  <button on:click={() => open = !open} id="profile-dropdown" class="align-middle w-8 h-8 bg-gray-200 shadow-sm dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700 text-gray-600 rounded-full focus:shadow-outline-purple focus:outline-none"  aria-label="Account" aria-haspopup="true">
    {$session.user.firstName[0]}
  </button>
  {#if open}
    <ul transition:slide={{duration: 100}} class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700" aria-label="submenu">
      <li class="flex">
        <a class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="/profile">
          <UserIcon className={'w-4 h-4 mr-3'} />
          <span>{$_('profile.title')}</span>
        </a>
      </li>
      <li class="flex">
        <button on:click={handleLogout} class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">
          <LogoutIcon className={'w-4 h-4 mr-3'} />
          <span>{$_('profile.logout')}</span>
        </button>
      </li>
    </ul>
  {/if}
{/if}
