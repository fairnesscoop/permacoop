<script>
  import {createEventDispatcher, onMount} from 'svelte';
  import SelectInput from '../../../components/inputs/SelectInput.svelte';
  import Button from '../../../components/inputs/Button.svelte';
  import Input from '../../../components/inputs/Input.svelte';

  const dispatch = createEventDispatcher();

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
  <SelectInput label={'Type de congé'} bind:value={leaveType}>
    <option value={'paid'}>Congé payé</option>
    <option value={'unpaid'}>Congé sans solde</option>
    <option value={'medical'}>Congé maladie</option>
    <option value={'special'}>Congé exceptionnel</option>
  </SelectInput>
  <div class="flex">
    <div class="w-1/2 pl-2">
      <Input type={"date"} label={'Date de début'} bind:value={startDate} />
    </div>
    <div class="w-1/2 pl-2">
      <SelectInput label={'Toute la journée'} bind:value={startsAllDay}>
        <option value={'true'}>Oui</option>
        <option value={'false'}>Non</option>
      </SelectInput>
    </div>
  </div>
  <div class="flex">
    <div class="w-1/2 pl-2">
      <Input type={"date"} label={'Date de fin'} bind:value={endDate} />
    </div>
    <div class="w-1/2 pl-2">
      <SelectInput label={'Toute la journée'} bind:value={endsAllDay}>
        <option value={'true'}>Oui</option>
        <option value={'false'}>Non</option>
      </SelectInput>
    </div>
  </div>
  <Input label={'Commentaire'} required={''} bind:value={comment} />
  <Button value={'Enregistrer'} {loading} disabled={!startDate || !endDate || loading} />
</form>
