<script lang="ts">
  import { page } from "$app/stores";
  import { _ } from "$lib/i18n";
  import paths from "$lib/paths";
  import { Theme } from "src/constants";
  import { theme } from "$lib/stores/theme";
  import { user } from "$lib/stores/auth";
  import Header from "src/components/Header/Header.svelte";
  import Nav from "src/components/Nav.svelte";
  import DashboardIcon from "src/components/icons/DashboardIcon.svelte";
  import CalendarIcon from "src/components/icons/CalendarIcon.svelte";
  import CrmIcon from "src/components/icons/CRMIcon.svelte";
  import UsersIcon from "src/components/icons/UsersIcon.svelte";
  import AccountingIcon from "src/components/icons/AccountingIcon.svelte";
  import type { LayoutData } from "./$types";
  import type { NavSection } from "$lib/navigation";

  export let data: LayoutData;

  $: user.set(data.user);
  $: theme.set(data.theme || Theme.LIGHT);
  $: isLoginPage = $page.url.pathname == paths.login;

  const sections: NavSection[] = [
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
        {
          label: $_("crm.contacts.title"),
          href: paths.contacts,
          isActive: $page.url.pathname === paths.contacts,
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
          label: $_("accounting.invoices.title"),
          href: paths.invoices,
          isActive: $page.url.pathname === paths.invoices,
        },
        {
          label: $_("accounting.quotes.title"),
          href: paths.quotes,
          isActive: $page.url.pathname === paths.quotes,
        },
        {
          label: $_("accounting.tasks.title"),
          href: paths.tasks,
          isActive: $page.url.pathname === paths.tasks,
        },
        {
          label: $_("accounting.daily_rates.title"),
          href: paths.dailyRates,
          isActive: $page.url.pathname === paths.dailyRates,
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
</script>

<div class={$theme === Theme.DARK ? "dark" : ""}>
  {#if isLoginPage}
    <slot />
  {:else}
    <div class="flex h-screen bg-gray-50 dark:bg-gray-900 dark-theme">
      <Nav {sections} />

      <div class="flex flex-col flex-1 w-full">
        <Header />

        <main class="h-full overflow-y-auto">
          <div class="container px-6 mx-auto grid">
            <slot />
          </div>
        </main>
      </div>
    </div>
  {/if}
</div>
