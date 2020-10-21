<script>
  import {createEventDispatcher} from 'svelte';
  import Input from '../../components/inputs/Input.svelte';
  import Button from '../../components/inputs/Button.svelte';

  export let firstName = '';
  export let lastName = '';
  export let email = '';
  export let password = '';
  export let loading;

  const dispatch = createEventDispatcher();
  const submit = () => {
    dispatch('save', {
      firstName,
      lastName,
      email,
      password
    });
  };
</script>

<form on:submit|preventDefault={submit} class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <Input type={'text'} label={'Prénom'} bind:value={firstName} />
  <Input type={'text'} label={'Nom'} bind:value={lastName} />
  <Input type={'email'} label={'Email'} bind:value={email} />
  <Input type={'password'} label={'Mot de passe'} bind:value={password} />
  <Button value={'Enregistrer'} {loading} disabled={!firstName || !lastName || !email || !password} />
</form>
