<script>
  import { _ } from 'svelte-i18n';
  import Input from 'components/inputs/Input.svelte';
  import ClipboardDocument from 'components/icons/ClipboardDocument.svelte';

  const url = `${process.env.CLIENT_API_URL}/leaves/calendar.ics?token=${process.env.CLIENT_CALENDAR_TOKEN}`;

  /** @type {HTMLInputElement}*/
  let input;

  const copyUrlToClipboard = () => {
    input.select(); // Visual feedback
    const value = input.value;
    navigator.clipboard.writeText(value);
  };
</script>

<div class="flex items-center">
  <label for="calendarUrl" class="text-sm text-gray-700 dark:text-gray-400">
    {$_('human_resources.leaves.calendar.subscription_link')}
  </label>

  <Input
    bind:input
    id="calendarUrl"
    value={url}
    readonly
    marginClass="md:ml-2" />

  <button
    type="button"
    class="ml-1 p-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 rounded-md bg-gray-500 active:bg-gray-700 hover:bg-gray-600"
    on:click={copyUrlToClipboard}
    title={$_('human_resources.leaves.calendar.copy_subscription_link')}>
    <ClipboardDocument className="w-4 h-4" />
  </button>
</div>
