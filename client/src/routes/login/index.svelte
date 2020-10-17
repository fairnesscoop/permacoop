<script>
  import { goto, stores } from '@sapper/app';
  import { post } from '../../utils/axios';
  import sessionProxy from '../proxy';
  import { errorNormalizer } from '../../normalizer/errors';
  import ServerErrors from '../../components/ServerErrors.svelte';
  import EmailInput from '../../components/inputs/EmailInput.svelte';
  import PasswordInput from '../../components/inputs/PasswordInput.svelte';

  let errors = [];
  let email = '';
  let password = '';
  let loading = false;

  const { session } = stores();

  const handleSubmit = async () => {
    try {
      loading = true;
      const { data } = await post('login', { email, password });

      await sessionProxy('POST', { ...data, scope: data.role });
      $session.user = { ...data, scope: data.role };

      goto('/');
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>Se connecter - Permacoop</title>
</svelte:head>

<div class="col-md-12">
  <ServerErrors errors="{errors}" />
  <form on:submit|preventDefault="{handleSubmit}">
    <EmailInput label="{'Adresse email'}" bind:value="{email}" />
    <PasswordInput label="{'Mot de passe'}" bind:value="{password}" />
    <button
      type="submit"
      class="btn btn-primary"
      disabled="{!email || !password || loading}"
    >
      Se connecter
    </button>
  </form>
</div>
