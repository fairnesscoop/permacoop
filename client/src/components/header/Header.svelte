<script>
  import Profile from './Profile.svelte';
  import Search from './Search.svelte';
  import ThemeToggler from './ThemeToggler.svelte';
  import BurgerIcon from '../icons/BurgerIcon.svelte';
  import { settings } from 'store';
</script>

<header class="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
  <div
    class="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
    <button
      id="burger"
      class="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
      aria-label="Menu"
      on:click={() => {
        $settings.openMobileMenu = !$settings.openMobileMenu;
      }}>
      <BurgerIcon className={'w-6 h-6'} />
    </button>
    <div class="flex justify-center flex-1 lg:mr-32">
      <Search />
    </div>
    <ul class="flex items-center flex-shrink-0 space-x-6">
      <li class="flex">
        <ThemeToggler />
      </li>
      <li class="relative">
        <Profile />
      </li>
    </ul>
  </div>
</header>

<svelte:window
  on:click={(e) => {
    if (e.target.id !== 'burger' && e.target.parentElement.id !== 'burger') {
      $settings.openMobileMenu = false;
    }
  }} />
