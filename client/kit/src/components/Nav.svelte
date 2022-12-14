<script lang="ts">
  import { _ } from "$lib/i18n";
  import { isMobileMenuOpen } from "$lib/stores/layout";
  import ChevronDownIcon from "./icons/ChevronDownIcon.svelte";
  import ChevronUpIcon from "./icons/ChevronUpIcon.svelte";
  import paths from "$lib/paths";
  import { clickOutside } from "$lib/actions";

  export let sections: NavSection[];

  const linkClass =
    "inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200";
  const activeLinkClass =
    "inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100";

  const toggleSection = (index: number) => {
    const section = sections[index];
    if (section.type === "group") {
      sections[index] = { ...section, isOpen: !section.isOpen };
    }
  };
</script>

<aside
  role="navigation"
  class="z-20 flex-shrink-0 overflow-y-auto bg-white dark:bg-gray-800 md:block"
  use:clickOutside={() => isMobileMenuOpen.set(false)}
>
  <div class="py-4 hidden md:block text-gray-500 dark:text-gray-400" class:open={$isMobileMenuOpen}>
    <a
      class="inline-flex ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
      href={paths.home}
    >
      <img src="images/logo.png" class="h-8" alt="" />
      <span class="ml-2">{$_("app")}</span>
    </a>

    <ul id="nav-menu" class="mt-6">
      {#each sections as section, index}
        <li class="relative px-6 py-3">
          {#if (section.type === "link" && section.isActive) || (section.type === "group" && section.links && section.links.some((link) => link.isActive))}
            <span
              class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
              aria-hidden="true"
            />
          {/if}

          {#if section.type === "link" && section.href}
            <a
              class={section.isActive ? activeLinkClass : linkClass}
              href={section.href}
              data-testid="nav-link"
              aria-current={section.isActive ? "page" : undefined}
            >
              <svelte:component this={section.icon} aria-hidden="true" className="w-5 h-5" />
              <span class="ml-4">{section.label}</span>
            </a>
          {/if}

          {#if section.type === "group" && section.links}
            <button
              class={linkClass}
              aria-expanded={section.isOpen}
              aria-controls="submenu-{index}"
              on:click={() => toggleSection(index)}
            >
              <span class="inline-flex items-center">
                <svelte:component this={section.icon} aria-hidden="true" className="w-5 h-5" />

                <span class="ml-4">
                  {section.label}
                </span>

                {#if section.isOpen}
                  <ChevronDownIcon className="w-4 h-4" />
                {:else}
                  <ChevronUpIcon className="w-4 h-4" />
                {/if}
              </span>
            </button>

            {#if section.isOpen}
              <ul
                id="submenu-{index}"
                class="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
              >
                {#each section.links || [] as link}
                  <li
                    class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    <a
                      class="w-full {link.isActive ? activeLinkClass : linkClass}"
                      aria-current={link.isActive ? "page" : undefined}
                      href={link.href}
                      data-testid="nav-link">{link.label}</a
                    >
                  </li>
                {/each}
              </ul>
            {/if}
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</aside>

<style>
  .open {
    display: block;
    position: fixed;
    margin-top: 4rem;
    height: 100%;
    background: #fff;
  }
</style>
