<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import DateInput from '../../../components/inputs/DateInput.svelte';
  import SelectInput from '../../../components/inputs/SelectInput.svelte';
  import TextInput from '../../../components/inputs/TextInput.svelte';

  const dispatch = createEventDispatcher();

  export let leaveType = 'paid';
  export let startDate = '';
  export let startsAllDay = 'true';
  export let endDate = '';
  export let endsAllDay = 'true';
  export let comment = '';

  const submit = () => {
    dispatch('save', {
      leaveType,
      startDate: new Date(startDate),
      startsAllDay,
      endDate: new Date(endDate),
      endsAllDay,
      comment,
    });
  };
</script>

<form on:submit|preventDefault="{submit}">
  <SelectInput label="{'Type de congé'}" bind:value="{leaveType}">
    <option value="{'paid'}">Congé payé</option>
    <option value="{'unpaid'}">Congé sans solde</option>
    <option value="{'medical'}">Congé maladie</option>
    <option value="{'special'}">Congé exceptionnel</option>
  </SelectInput>
  <div class="row">
    <div class="col-md-6">
      <DateInput label="{'Date de début'}" bind:value="{startDate}" />
    </div>
    <div class="col-md-6">
      <SelectInput label="{'Toute la journée'}" bind:value="{startsAllDay}">
        <option value="{'true'}">Oui</option>
        <option value="{'false'}">Non</option>
      </SelectInput>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6">
      <DateInput label="{'Date de fin'}" bind:value="{endDate}" />
    </div>
    <div class="col-md-6">
      <SelectInput label="{'Toute la journée'}" bind:value="{endsAllDay}">
        <option value="{'true'}">Oui</option>
        <option value="{'false'}">Non</option>
      </SelectInput>
    </div>
  </div>
  <TextInput label="{'Commentaire'}" required="{''}" bind:value="{comment}" />
  <button class="btn btn-primary" disabled="{!startDate || !endDate}">
    Enregistrer
  </button>
</form>
