<script lang="ts">
  import { _ } from "$lib/i18n";
  import { user } from "$lib/stores/auth";
</script>

<svelte:head>
  <title>{$_("dashboard.title")} - {$_("app")}</title>
</svelte:head>

{#if $user}
  <h2 class="my-6 inline-flex text-2xl font-semibold text-gray-700 dark:text-gray-200">
    {$_("dashboard.welcome", { firstName: $user.firstName, lastName: $user.lastName })}
  </h2>
{/if}
