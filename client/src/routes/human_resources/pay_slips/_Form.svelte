<script>
  import {createEventDispatcher, onMount} from 'svelte';
  import {stores} from  '@sapper/app';
  import {get} from '../../../utils/axios';
  import Button from '../../../components/inputs/Button.svelte';
  import UsersInput from '../../../components/inputs/UsersInput.svelte';
  import MonthsInput from '../../../components/inputs/MonthsInput.svelte';

  const { session } = stores();

  let data = [];

  onMount(async () => {
    ({data} = await get('users', {}, $session.user.apiToken));
  });

  export let date = new Date();
  export let userId = '';
  export let files = [];
  export let loading;

  const dispatch = createEventDispatcher();

  const submit = () => {
    const form = new FormData();
    form.append('date', new Date(date).toISOString());
    form.append('userId', userId);
    form.append('file', files[0]);

    dispatch('save', form);
  };
</script>

<form on:submit|preventDefault={submit} class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <UsersInput users={data} bind:userId />
  <MonthsInput label={'Période'} bind:date amount={6} />
  <div class="block mt-4 text-sm">
    <label class="text-gray-700 dark:text-gray-400">
      Fiche de paie
    </label>
    <input
      type="file"
      id="file"
      required="required"
      class="block w-full mt-1 text-sm border-green-600 dark:text-gray-300 dark:bg-gray-700 focus:border-green-400 focus:outline-none focus:shadow-outline-green form-input"
      bind:files />
    <span class="text-xs text-green-600 dark:text-green-400">
      Format PDF uniquement
    </span>
  </div>
  <Button value={'Enregistrer'} {loading} disabled={!date || !userId || !files.length > 0 || loading} />
</form>
