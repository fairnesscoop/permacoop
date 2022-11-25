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

  export let data: LayoutData;

  $: user.set(data.user);
  $: theme.set(data.theme || Theme.LIGHT);
  $: isLoginPage = $page.url.pathname == paths.login;

  const sections: NavSection[] = [
    {
      label: $_("dashboard.title"),
      href: paths.home,
      isActive: $page.url.pathname === paths.home,
      icon: DashboardIcon,
    },
    {
      label: $_("faircalendar.breadcrumb"),
      href: paths.fairCalendar,
      isActive: $page.url.pathname.startsWith(paths.fairCalendar),
      icon: CalendarIcon,
    },
    {
      type: "list",
      label: $_("crm.breadcrumb"),
      subSections: [
        { label: $_("crm.projects.title"), href: paths.projects },
        { label: $_("crm.customers.title"), href: paths.customers },
        { label: $_("crm.contacts.title"), href: paths.contacts },
      ],
      isActive: $page.url.pathname.startsWith(paths.crm),
      isOpen: true,
      icon: CrmIcon,
    },
    {
      type: "list",
      label: $_("accounting.breadcrumb"),
      subSections: [
        { label: $_("accounting.invoices.title"), href: paths.invoices },
        { label: $_("accounting.quotes.title"), href: paths.quotes },
        { label: $_("accounting.tasks.title"), href: paths.tasks },
        { label: $_("accounting.daily_rates.title"), href: paths.dailyRates },
      ],
      isActive: $page.url.pathname.startsWith(paths.accounting),
      isOpen: true,
      icon: AccountingIcon,
    },
    {
      type: "list",
      label: $_("human_resources.breadcrumb"),
      subSections: [
        { label: $_("human_resources.leaves.title"), href: paths.leaves },
        { label: $_("human_resources.payslips.breadcrumb"), href: paths.payslips },
        { label: $_("human_resources.meal_tickets.breadcrumb"), href: paths.mealTickets },
        { label: $_("human_resources.savings_records.title"), href: paths.savingsRecords },
        { label: $_("human_resources.users.title"), href: paths.users },
      ],
      isActive: $page.url.pathname.startsWith(paths.humanResources),
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
