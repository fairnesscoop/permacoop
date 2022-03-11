<script>
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';
  import Button from 'components/inputs/Button.svelte';
  import Input from 'components/inputs/Input.svelte';

  const dispatch = createEventDispatcher();

  export let exceptionDate;

  const submit = () => {
    dispatch('save', {
      exceptionDate: new Date(exceptionDate),
    });
  };
</script>

<form
  on:submit|preventDefault={submit}
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <div class="flex">
    <div class="flex items-center">
      <span class="block mr-5">
        {$_('human_resources.meal_tickets.do_not_want_to_receive_meal_ticket_this_day')}
      </span>

      <Input marginClass="mt-0" type={'date'} bind:value={exceptionDate} />
    </div>
  </div>

  <Button value={$_('common.form.save')} disabled={!exceptionDate} />
</form>
