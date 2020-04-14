<script>
  import {goto} from '@sapper/app';
  import {client as axios} from '../../utils/axios';
  import {user} from '../../store';
  import {TokenStorage} from '../../utils/tokenStorage';
  import {errorNormalizer} from '../../normalizer/errors';
  import ServerErrors from '../_components/ServerErrors.svelte';

  let pageTitle = 'Se connecter';
  let errors = [];
  let email = '';
  let password = '';

  const handleSubmit = async () => {
    try {
      const {data} = await axios.post('login', {email, password});
      const {apiToken, firstName, lastName, id} = data;

      TokenStorage.save(apiToken);
      $user = {firstName, lastName, id};

      return goto('/');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>Permacoop - {pageTitle}</title>
</svelte:head>

<div class="col-md-12">
  <ServerErrors {errors} />
  <form on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <label for="email">Adresse email *</label>
      <input
        type="email"
        id="email"
        required="required"
        bind:value={email}
        class="form-control" />
    </div>
    <div class="form-group">
      <label for="password">Mot de passe *</label>
      <input
        type="password"
        id="password"
        required="required"
        bind:value={password}
        class="form-control" />
    </div>
    <button
      type="submit"
      class="btn btn-primary"
      disabled={!email || !password}>
      Se connecter
    </button>
  </form>
</div>
