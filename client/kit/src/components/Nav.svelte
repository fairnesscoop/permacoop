<script lang="ts">
  import { page } from "$app/stores";
  import { _ } from "$lib/i18n";
  import { isMobileMenuOpen } from "$lib/stores/layout";
  import paths from "$lib/paths";
  import { clickOutside } from "$lib/actions";
  import ChevronDownIcon from "./icons/ChevronDownIcon.svelte";
  import ChevronUpIcon from "./icons/ChevronUpIcon.svelte";
  import DashboardIcon from "./icons/DashboardIcon.svelte";
  import CalendarIcon from "./icons/CalendarIcon.svelte";
  import CrmIcon from "./icons/CRMIcon.svelte";
  import UsersIcon from "./icons/UsersIcon.svelte";
  import AccountingIcon from "./icons/AccountingIcon.svelte";

  const sections = [
    {
      type: "link",
      label: $_("dashboard.title"),
      href: paths.home,
      isActive: $page.url.pathname === paths.home,
      icon: DashboardIcon,
    },
    {
      type: "link",
      label: $_("faircalendar.breadcrumb"),
      href: paths.fairCalendar,
      isActive: $page.url.pathname.startsWith(paths.fairCalendar),
      icon: CalendarIcon,
    },
    {
      type: "group",
      label: $_("crm.breadcrumb"),
      links: [
        {
          label: $_("crm.projects.title"),
          href: paths.projects,
          isActive: $page.url.pathname === paths.projects,
        },
        {
          label: $_("crm.customers.title"),
          href: paths.customers,
          isActive: $page.url.pathname === paths.customers,
        },
      ],
      isOpen: true,
      icon: CrmIcon,
    },
    {
      type: "group",
      label: $_("accounting.breadcrumb"),
      links: [
        {
          label: $_("accounting.tasks.title"),
          href: paths.tasks,
          isActive: $page.url.pathname === paths.tasks,
        },
      ],
      isOpen: true,
      icon: AccountingIcon,
    },
    {
      type: "group",
      label: $_("human_resources.breadcrumb"),
      links: [
        {
          label: $_("human_resources.leaves.title"),
          href: paths.leaves,
          isActive: $page.url.pathname === paths.leaves,
        },
        {
          label: $_("human_resources.payslips.breadcrumb"),
          href: paths.payslips,
          isActive: $page.url.pathname === paths.payslips,
        },
        {
          label: $_("human_resources.meal_tickets.breadcrumb"),
          href: paths.mealTickets,
          isActive: $page.url.pathname === paths.mealTickets,
        },
        {
          label: $_("human_resources.savings_records.title"),
          href: paths.savingsRecords,
          isActive: $page.url.pathname === paths.savingsRecords,
        },
        {
          label: $_("human_resources.users.title"),
          href: paths.users,
          isActive: $page.url.pathname === paths.users,
        },
      ],
      isOpen: true,
      icon: UsersIcon,
    },
  ];

  const linkClass =
    "inline-flex items-center w-full text-sm transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200";
  const activeLinkClass =
    "inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100";

  const toggleSection = (index: number) => {
    const section = sections[index];
    if (section.links) {
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
      <img src="/kit/images/logo.png" class="h-8" alt="" />
      <span class="ml-2">{$_("app")}</span>
    </a>

    <ul id="nav-menu" class="mt-6">
      {#each sections as section, index}
        <li class="relative px-6 py-3">
          {#if section.isActive || section?.links?.some((link) => link.isActive)}
            <span
              class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
              aria-hidden="true"
            />
          {/if}

          {#if section.href}
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

          {#if section.links}
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
