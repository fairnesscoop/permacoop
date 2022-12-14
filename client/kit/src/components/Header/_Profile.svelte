<script lang="ts">
  import { slide } from "svelte/transition";
  import { goto } from "$app/navigation";
  import { _ } from "$lib/i18n";
  import UserIcon from "src/components/icons/UserIcon.svelte";
  import LogoutIcon from "src/components/icons/LogoutIcon.svelte";
  import { user, logout } from "$lib/stores/auth";
  import paths from "$lib/paths";
  import { clickOutside } from "$lib/actions";

  let open = false;

  const handleLogout = async () => {
    logout();
    await goto(paths.login);
  };
</script>

{#if $user}
  <div use:clickOutside={{ callback: () => (open = false) }}>
    <button
      on:click={() => (open = !open)}
      type="button"
      id="profile-dropdown"
      class="align-middle w-8 h-8 bg-gray-200 shadow-sm dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700 text-gray-600 rounded-full"
      aria-controls="profile-dropdown-menu"
      aria-expanded={open}
      title="Paramètres"
    >
      <span aria-hidden="true">
        {$user.firstName[0]}
      </span>
    </button>
    {#if open}
      <ul
        transition:slide={{ duration: 100 }}
        class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
        id="profile-dropdown-menu"
      >
        <li class="flex">
          <a
            class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            href="/profile"
          >
            <UserIcon aria-hidden="true" className="w-4 h-4 mr-3" />
            <span>{$_("profile.title")}</span>
          </a>
        </li>
        <li class="flex">
          <button
            on:click={handleLogout}
            class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          >
            <LogoutIcon className="w-4 h-4 mr-3" />
            <span>{$_("profile.logout")}</span>
          </button>
        </li>
      </ul>
    {/if}
  </div>
{/if}
