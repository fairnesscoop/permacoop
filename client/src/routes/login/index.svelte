<script>
  import { goto, stores } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import Cookies from 'js-cookie';
  import { post } from '../../utils/axios';
  import { errorNormalizer } from '../../normalizer/errors';
  import ServerErrors from '../../components/ServerErrors.svelte';
  import Input from '../../components/inputs/Input.svelte';
  import Button from '../../components/inputs/Button.svelte';

  let errors = [];
  let email = '';
  let password = '';
  let loading = false;

  const { session } = stores();

  const handleSubmit = async () => {
    try {
      loading = true;
      const {
        data: { id, firstName, lastName, role, apiToken },
      } = await post('login', { email, password });
      $session.user = { id, firstName, lastName, email, scope: role };
      Cookies.set('permacoop_token', apiToken, {
        expires: 365,
        secure: process.env.NODE_ENV === 'production',
      });
      goto('/');
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>{$_('login.title')} - {$_('app')}</title>
</svelte:head>

<div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
  <div
    class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
    <div class="flex flex-col overflow-y-auto md:flex-row">
      <div class="h-32 md:h-auto md:w-1/2">
        <img
          aria-hidden="true"
          class="object-cover w-full h-full"
          src="images/login-office.jpeg"
          alt="Office" />
      </div>
      <form
        on:submit|preventDefault="{handleSubmit}"
        class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
        <div class="w-full">
          <h1
            class="mb-5 text-xl font-semibold text-center text-gray-700 dark:text-gray-200">
            {$_('login.sub_title')}
          </h1>
          <ServerErrors errors="{errors}" />
          <Input
            type="{'email'}"
            label="{$_('login.form.email')}"
            bind:value="{email}" />
          <Input
            type="{'password'}"
            label="{$_('login.form.password')}"
            bind:value="{password}" />
          <Button
            value="{$_('login.form.button')}"
            loading="{loading}"
            disabled="{!email || !password || loading}" />
          <hr class="my-8" />
          <p class="mt-4">
            <a
              class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
              href="login/forgot-password">
              {$_('login.password_lost')}
            </a>
          </p>
        </div>
      </form>
    </div>
  </div>
</div>
