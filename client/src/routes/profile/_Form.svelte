<script>
  import {createEventDispatcher} from 'svelte';
  import TextInput from '../../components/inputs/TextInput.svelte';
  import EmailInput from '../../components/inputs/EmailInput.svelte';
  import PasswordInput from '../../components/inputs/PasswordInput.svelte';

  export let firstName = '';
  export let lastName = '';
  export let email = '';
  export let password = '';

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

<form on:submit|preventDefault={submit}>
  <TextInput label={'Prénom'} bind:value={firstName} />
  <TextInput label={'Nom'} bind:value={lastName} />
  <EmailInput label={'Email'} bind:value={email} />
  <PasswordInput label={'Mot de passe'} bind:value={password} />
  <button
    type="submit"
    class="btn btn-primary"
    disabled={!firstName || !lastName || !email || !password}>
    Enregistrer
  </button>
</form>
