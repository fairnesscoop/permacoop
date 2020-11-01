<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import SelectInput from '../../../components/inputs/SelectInput.svelte';
  import Button from '../../../components/inputs/Button.svelte';
  import Input from '../../../components/inputs/Input.svelte';

  const dispatch = createEventDispatcher();
  const leaveTypes = ['paid', 'unpaid', 'medical', 'special'];

  export let leaveType = 'paid';
  export let startDate = '';
  export let startsAllDay = 'true';
  export let endDate = '';
  export let endsAllDay = 'true';
  export let comment = '';
  export let loading;

  const submit = () => {
    dispatch('save', {
      leaveType,
      startDate: new Date(startDate),
      startsAllDay,
      endDate: new Date(endDate),
      endsAllDay,
      comment
    });
  };
</script>

<form on:submit|preventDefault={submit} class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <SelectInput label={$_('human_resources.holidays.leave_type.title')} bind:value={leaveType}>
    {#each leaveTypes as leaveType}
      <option value={leaveType}>{$_(`human_resources.holidays.leave_type.${leaveType}`)}</option>
    {/each}
  </SelectInput>
  <div class="flex">
    <div class="w-1/2 pr-2">
      <Input type={"date"} label={$_('human_resources.holidays.form.from_date')} bind:value={startDate} />
    </div>
    <div class="w-1/2 pl-2">
      <SelectInput label={$_('human_resources.holidays.form.all_day')} bind:value={startsAllDay}>
        <option value={'true'}>{$_('common.yes')}</option>
        <option value={'false'}>{$_('common.no')}</option>
      </SelectInput>
    </div>
  </div>
  <div class="flex">
    <div class="w-1/2 pr-2">
      <Input type={"date"} label={$_('human_resources.holidays.form.to_date')} bind:value={endDate} />
    </div>
    <div class="w-1/2 pl-2">
      <SelectInput label={$_('human_resources.holidays.form.all_day')} bind:value={endsAllDay}>
        <option value={'true'}>{$_('common.yes')}</option>
        <option value={'false'}>{$_('common.no')}</option>
      </SelectInput>
    </div>
  </div>
  <Input label={$_('human_resources.holidays.form.comment')} required={''} bind:value={comment} />
  <Button value={$_('common.form.save')} {loading} disabled={!startDate || !endDate || loading} />
</form>
