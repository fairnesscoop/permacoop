<script>
  import { tick } from 'svelte';
  import { stores, goto } from '@sapper/app';
  import { guard } from '@beyonk/sapper-rbac';
  import { settings } from '../store';
  import routes from '../routes';
  import Nav from './../components/Nav.svelte';
  import Header from './../components/header/Header.svelte';

  export let segment;

  const { page, session } = stores();
  const options = {
    routes,
    deny: () => goto('/login'),
  };

  page.subscribe(async (v) => {
    await tick();
    guard(v.path, $session.user, options);
  });
</script>

<div class="{$settings.theme}">
  {#if segment !== 'login'}
    <div class="flex h-screen bg-gray-50 dark:bg-gray-900 dark-theme">
      <Nav segment="{segment}" />
      <div class="flex flex-col flex-1 w-full">
        <Header />
        <main class="h-full overflow-y-auto">
          <div class="container px-6 mx-auto grid">
            <slot />
          </div>
        </main>
      </div>
    </div>
  {:else}
    <slot />
  {/if}
</div>
