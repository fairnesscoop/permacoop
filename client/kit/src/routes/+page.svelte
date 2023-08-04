<script lang="ts">
  import { _ } from "$lib/i18n";
  import { AxiosError, get } from "$lib/axios";
  import { user } from "$lib/stores/auth";
  import { errorNormalizer } from "$lib/errors/normalizer";
  import Link from "src/components/links/Link.svelte";

  let errors = null;

  const fetchPendingLeaveRequestsCount = async (): Promise<number> => {
    try {
      const response = await get("leave-requests/pending-count");
      return response.data;
    } catch (e) {
      errors = errorNormalizer(e as AxiosError);
      return 0;
    }
  };
</script>

<svelte:head>
  <title>{$_("dashboard.title")} - {$_("app")}</title>
</svelte:head>

{#if $user}
  <h2 class="my-6 inline-flex text-2xl font-semibold text-gray-700 dark:text-gray-200">
    {$_("dashboard.welcome", { firstName: $user.firstName, lastName: $user.lastName })}
  </h2>

  <h3 class="my-3 inline-flex text-xl font-semibold text-gray-700 dark:text-gray-200">
    {$_("human_resources.leaves.requests.title")}
  </h3>

  {#await fetchPendingLeaveRequestsCount() then numPendingLeaveRequests}
    <div class="lg:flex items-center mb-6">
      <p class="text-gray-700 dark:text-gray-300">
        {$_("dashboard.leave_requests.pending", { count: numPendingLeaveRequests })}
      </p>
      {#if numPendingLeaveRequests > 0}
        <Link
          href={"/human_resources/leaves/requests"}
          value={$_("human_resources.leaves.requests.see_all.title")}
        />
      {/if}
    </div>
  {/await}
{/if}
