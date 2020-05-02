<script>
  import {goto} from '@sapper/app';
  import {client as axios} from '../../utils/axios';
  import {user} from '../../store';
  import {TokenStorage} from '../../utils/tokenStorage';
  import {errorNormalizer} from '../../normalizer/errors';
  import ServerErrors from '../../components/ServerErrors.svelte';
  import EmailInput from '../../components/inputs/EmailInput.svelte';
  import PasswordInput from '../../components/inputs/PasswordInput.svelte';

  let errors = [];
  let email = '';
  let password = '';

  const handleSubmit = async () => {
    try {
      const {data} = await axios.post('login', {email, password});
      const {apiToken, firstName, lastName, role, id} = data;

      TokenStorage.save(apiToken);
      $user = {firstName, lastName, id, role};

      return goto('/');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>Permacoop - Se connecter</title>
</svelte:head>

<div class="col-md-12">
  <ServerErrors {errors} />
  <form on:submit|preventDefault={handleSubmit}>
    <EmailInput label={'Adresse email'} bind:value={email} />
    <PasswordInput label={'Mot de passe'} bind:value={password} />
    <button
      type="submit"
      class="btn btn-primary"
      disabled={!email || !password}>
      Se connecter
    </button>
  </form>
</div>
