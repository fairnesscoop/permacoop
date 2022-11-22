<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import { page } from "$app/stores";
  import { _ } from "$lib/i18n";
  import { ROLES } from "src/constants";
  import { isMobileMenuOpen } from "$lib/stores/layout";
  import { user } from "$lib/stores/auth";
  import DashboardIcon from "./icons/DashboardIcon.svelte";
  import UsersIcon from "./icons/UsersIcon.svelte";
  import CalendarIcon from "./icons/CalendarIcon.svelte";
  import CRMIcon from "./icons/CRMIcon.svelte";
  import AccountingIcon from "./icons/AccountingIcon.svelte";
  import ChevronDownIcon from "./icons/ChevronDownIcon.svelte";
  import ChevronUpIcon from "./icons/ChevronUpIcon.svelte";
  import paths from "$lib/paths";

  const userRoles = [ROLES.COOPERATOR, ROLES.EMPLOYEE];

  const activeClass = "absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg";
  const linkClass =
    "inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200";
  const activeLinkClass =
    "inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100";
  const subLinkClass =
    "px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200";

  type SimpleSection = {
    type: "simple";
    href: string;
    label: string;
    isActive: boolean;
    icon: typeof SvelteComponent;
  };

  type ListSection = {
    type: "list";
    label: string;
    isActive: boolean;
    name: string;
    items: { label: string; href: string }[];
    isOpen: boolean;
    icon: typeof SvelteComponent;
    isEnabledForUser: (user: User) => boolean;
  };

  type Section = SimpleSection | ListSection;

  const sections: Section[] = [
    {
      type: "simple",
      label: $_("dashboard.title"),
      href: paths.home,
      isActive: $page.url.pathname === paths.home,
      icon: DashboardIcon,
    },
    {
      type: "simple",
      label: $_("faircalendar.breadcrumb"),
      href: paths.fairCalendar,
      isActive: $page.url.pathname.startsWith(paths.fairCalendar),
      icon: CalendarIcon,
    },
    {
      type: "list",
      label: $_("crm.breadcrumb"),
      name: "crm",
      items: [
        { label: $_("crm.projects.title"), href: paths.projects },
        { label: $_("crm.customers.title"), href: paths.customers },
        { label: $_("crm.contacts.title"), href: paths.contacts },
      ],
      isActive: $page.url.pathname.startsWith(paths.crm),
      isOpen: true,
      icon: CRMIcon,
      isEnabledForUser: (u) => userRoles.includes(u.scope),
    },
    {
      type: "list",
      label: $_("accounting.breadcrumb"),
      name: "accounting",
      items: [
        { label: $_("accounting.invoices.title"), href: paths.invoices },
        { label: $_("accounting.quotes.title"), href: paths.quotes },
        { label: $_("accounting.tasks.title"), href: paths.tasks },
        { label: $_("accounting.daily_rates.title"), href: paths.dailyRates },
      ],
      isActive: $page.url.pathname.startsWith(paths.accounting),
      isOpen: true,
      icon: AccountingIcon,
      isEnabledForUser: (u) => userRoles.includes(u.scope),
    },
    {
      type: "list",
      name: "human_resources",
      label: $_("human_resources.breadcrumb"),
      items: [
        { label: $_("human_resources.leaves.title"), href: paths.leaves },
        { label: $_("human_resources.payslips.breadcrumb"), href: paths.payslips },
        { label: $_("human_resources.meal_tickets.breadcrumb"), href: paths.mealTickets },
        { label: $_("human_resources.savings_records.title"), href: paths.savingsRecords },
        { label: $_("human_resources.users.title"), href: paths.users },
      ],
      isActive: $page.url.pathname.startsWith(paths.humanResources),
      isOpen: true,
      icon: UsersIcon,
      isEnabledForUser: (u) => userRoles.includes(u.scope),
    },
  ];

  const toggleListSection = (index: number) => {
    const section = sections[index];

    if (section.type === "list") {
      sections[index] = { ...section, isOpen: !section.isOpen };
    }
  };
</script>

{#if $user}
  <aside
    class="z-20 flex-shrink-0 hidden overflow-y-auto bg-white dark:bg-gray-800 md:block"
    class:open={$isMobileMenuOpen}
  >
    <div class="py-4 text-gray-500 dark:text-gray-400">
      <a
        class="inline-flex ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
        href={paths.home}
      >
        <img src="images/logo.png" class="h-8" alt="Fairness" />
        <span class="ml-2">{$_("app")}</span>
      </a>
      <ul class="mt-6">
        {#each sections as section, index}
          {#if section.type === "simple"}
            <li class="relative px-6 py-3">
              {#if section.isActive} <span class={activeClass} aria-hidden="true" />{/if}
              <a class={section.isActive ? activeLinkClass : linkClass} href={section.href}>
                <svelte:component this={section.icon} className="w-5 h-5" />
                <span class="ml-4">{section.label}</span>
              </a>
            </li>
          {:else if section.isEnabledForUser($user)}
            <li class="relative px-6 py-3">
              <button
                class={section.isActive ? activeLinkClass : linkClass}
                aria-haspopup="true"
                on:click={() => toggleListSection(index)}
              >
                {#if section.isActive}
                  <span class={activeClass} aria-hidden="true" />
                {/if}
                <span class="inline-flex items-center">
                  <svelte:component this={section.icon} className="w-5 h-5" />
                  <span class="ml-4">{section.label}</span>
                </span>
                {#if section.isOpen}
                  <ChevronDownIcon className="w-4 h-4" />
                {:else}
                  <ChevronUpIcon className="w-4 h-4" />
                {/if}
              </button>
              <ul
                class="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                class:hidden={!section.isOpen}
                aria-label="submenu"
              >
                {#each section.items as item}
                  <li class={subLinkClass}>
                    <a class="w-full" href={item.href}>{item.label}</a>
                  </li>
                {/each}
              </ul>
            </li>
          {/if}
        {/each}
      </ul>
    </div>
  </aside>
{/if}
