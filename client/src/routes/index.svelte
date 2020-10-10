<script>
  import { stores } from '@sapper/app';

  const { session } = stores();
</script>

<svelte:head>
  <title>Tableau de bord - Permacoop</title>
</svelte:head>

{#if $session.user}
  <h2 class="my-6 inline-flex text-2xl font-semibold text-gray-700 dark:text-gray-200">
    {`Bonjour ${$session.user.firstName} ${$session.user.lastName} !`}
  </h2>
{/if}
