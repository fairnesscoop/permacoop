<script>
  import { _ } from 'svelte-i18n';
  import { stores } from '@sapper/app';

  const { session } = stores();
</script>

<svelte:head>
  <title>{$_('dashboard.title')} - {$_('app')}</title>
</svelte:head>

{#if $session.user}
  <h2
    class="my-6 inline-flex text-2xl font-semibold text-gray-700 dark:text-gray-200">
    {$_('dashboard.welcome', {
      values: {
        firstName: $session.user.firstName,
        lastName: $session.user.lastName,
      },
    })}
  </h2>
{/if}
