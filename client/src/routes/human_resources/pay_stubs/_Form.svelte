<script>
  import {createEventDispatcher, onMount} from 'svelte';
  import {client as axios} from '../../../utils/axios';
  import UsersInput from '../../../components/inputs/UsersInput.svelte';
  import MonthsInput from '../../../components/inputs/MonthsInput.svelte';

  let data = [];

  onMount(async () => {
    ({data} = await axios.get('users'));
  });

  export let date = new Date();
  export let userId = '';
  export let files = [];

  const dispatch = createEventDispatcher();

  const submit = () => {
    const form = new FormData();
    form.append('date', new Date(date).toISOString());
    form.append('userId', userId);
    form.append('file', files[0]);

    dispatch('save', form);
  };
</script>

<form on:submit|preventDefault={submit}>
  <UsersInput users={data} bind:userId />
  <MonthsInput label={'Période *'} bind:date amount={3} />
  <div class="form-group">
    <label for="file">Fiche de paie *</label>
    <input
      type="file"
      id="file"
      required="required"
      class="form-control"
      bind:files />
    <small class="form-text text-muted">Format PDF uniquement</small>
  </div>
  <button
    class="btn btn-primary"
    disabled={!date || !userId || !files.length > 0}>
    Enregistrer
  </button>
</form>
