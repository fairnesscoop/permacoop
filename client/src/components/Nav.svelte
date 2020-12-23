<script>
  import { stores } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import {
    ROLE_COOPERATOR,
    ROLE_EMPLOYEE,
    ROLE_ACCOUNTANT,
  } from 'constants/roles';
  import DashboardIcon from './icons/DashboardIcon.svelte';
  import UsersIcon from './icons/UsersIcon.svelte';
  import CalendarIcon from './icons/CalendarIcon.svelte';
  import CRMIcon from './icons/CRMIcon.svelte';
  import AccountingIcon from './icons/AccountingIcon.svelte';
  import ChevronDownIcon from './icons/ChevronDownIcon.svelte';
  import { settings } from 'store';

  const { session } = stores();

  export let segment;

  let userRoles = [ROLE_COOPERATOR, ROLE_EMPLOYEE];
  let accountantRoles = [ROLE_COOPERATOR, ROLE_ACCOUNTANT];

  const activeClass =
    'absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg';
  const linkClass =
    'inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200';
  const activeLinkClass =
    'inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100';
  const subLinkClass =
    'px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200';
</script>

{#if $session.user}
  <aside
    class="z-20 hidden overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0"
    class:open={$settings.openMobileMenu}>
    <div class="py-4 text-gray-500 dark:text-gray-400">
      <a
        class="inline-flex ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
        href="/">
        <img src="images/logo.png" class="h-8" alt="Fairness" />
        <span class="ml-2">{$_('app')}</span>
      </a>
      <ul class="mt-6">
        <li class="relative px-6 py-3">
          {#if !segment}<span class={activeClass} aria-hidden="true" />{/if}
          <a class={!segment ? activeLinkClass : linkClass} href="/">
            <DashboardIcon className={'w-5 h-5'} />
            <span class="ml-4">{$_('dashboard.title')}</span>
          </a>
        </li>
      </ul>
      <ul>
        {#if userRoles.includes($session.user.scope)}
          <li class="relative px-6 py-3">
            {#if 'faircalendar' === segment}
              <span class={activeClass} aria-hidden="true" />
            {/if}
            <a
              class={'faircalendar' === segment ? activeLinkClass : linkClass}
              href="/faircalendar">
              <CalendarIcon className={'w-5 h-5'} />
              <span class="ml-4">{$_('faircalendar.breadcrumb')}</span>
            </a>
          </li>
        {/if}
        <li class="relative px-6 py-3">
          <button
            class={'crm' === segment ? activeLinkClass : linkClass}
            aria-haspopup="true">
            {#if 'crm' === segment}
              <span class={activeClass} aria-hidden="true" />
            {/if}
            <span class="inline-flex items-center">
              <CRMIcon className={'w-5 h-5'} />
              <span class="ml-4">{$_('crm.breadcrumb')}</span>
            </span>
            <ChevronDownIcon className={'w-4 h-4'} />
          </button>
          <ul
            class="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
            aria-label="submenu">
            {#if userRoles.includes($session.user.scope)}
              <li class={subLinkClass}>
                <a
                  class="w-full"
                  href="/crm/projects">{$_('crm.projects.title')}</a>
              </li>
              <li class={subLinkClass}>
                <a
                  class="w-full"
                  href="/crm/customers">{$_('crm.customers.title')}</a>
              </li>
            {/if}
          </ul>
        </li>
        {#if userRoles.includes($session.user.scope)}
          <li class="relative px-6 py-3">
            {#if 'accounting' === segment}
              <span class={activeClass} aria-hidden="true" />
            {/if}
            <button
              class={'accounting' === segment ? activeLinkClass : linkClass}
              aria-haspopup="true">
              <span class="inline-flex items-center">
                <AccountingIcon className={'w-5 h-5'} />
                <span class="ml-4">{$_('accounting.breadcrumb')}</span>
              </span>
              <ChevronDownIcon className={'w-4 h-4'} />
            </button>
            <ul
              class="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
              aria-label="submenu">
              <li class={subLinkClass}>
                <a
                  class="w-full"
                  href="accounting/invoices">{$_('accounting.invoices.title')}</a>
              </li>
              <li class={subLinkClass}>
                <a
                  class="w-full"
                  href="accounting/quotes">{$_('accounting.quotes.title')}</a>
              </li>
              <li class={subLinkClass}>
                <a
                  class="w-full"
                  href="accounting/tasks">{$_('accounting.tasks.title')}</a>
              </li>
              <li class={subLinkClass}>
                <a
                  class="w-full"
                  href="accounting/daily_rates">{$_('accounting.daily_rates.title')}</a>
              </li>
            </ul>
          </li>
        {/if}
        <li class="relative px-6 py-3">
          <button
            class={'human_resources' === segment ? activeLinkClass : linkClass}
            aria-haspopup="true">
            {#if 'human_resources' === segment}
              <span class={activeClass} aria-hidden="true" />
            {/if}
            <span class="inline-flex items-center">
              <UsersIcon className={'w-5 h-5'} />
              <span class="ml-4">{$_('human_resources.breadcrumb')}</span>
            </span>
            <ChevronDownIcon className={'w-4 h-4'} />
          </button>
          <ul
            class="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
            aria-label="submenu">
            {#if userRoles.includes($session.user.scope)}
              <li class={subLinkClass}>
                <a
                  class="w-full"
                  href="human_resources/meal_tickets">{$_('human_resources.meal_tickets.title')}</a>
              </li>
              <li class={subLinkClass}>
                <a
                  class="w-full"
                  href="human_resources/meal_tickets">{$_('human_resources.meal_tickets.title')}</a>
              </li>
              <li class={subLinkClass}>
                <a
                  class="w-full"
                  href="human_resources/meal_tickets">{$_('human_resources.meal_tickets.title')}</a>
              </li>
              <li class="{subLinkClass}">
                <a
                  class="w-full"
                  href="human_resources/users">{$_('human_resources.users.title')}</a>
              </li>
              <li class={subLinkClass}>
                <a
                  class="w-full"
                  href="human_resources/meal_tickets">{$_('human_resources.meal_tickets.title')}</a>
              </li>
              <li class="{subLinkClass}">
                <a
                  class="w-full"
                  href="human_resources/users">{$_('human_resources.users.title')}</a>
              </li>
              <li class={subLinkClass}>
                <a
                  class="w-full"
                  href="human_resources/leaves">{$_('human_resources.leaves.title')}</a>
              </li>
            {/if}
            <li class={subLinkClass}>
              <a
                class="w-full"
                href="human_resources/pay_slips">{$_('human_resources.pay_slips.title')}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </aside>
{/if}
