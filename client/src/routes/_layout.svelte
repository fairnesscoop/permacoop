<script>
  import { tick } from 'svelte';
  import { stores, goto } from '@sapper/app';
  import { guard } from '@beyonk/sapper-rbac';
  import routes from '../routes';
  import Nav from './../components/Nav.svelte';
  import Footer from './../components/Footer.svelte';

  export let segment;

  const { page, session } = stores();
  const options = {
    routes,
    deny: () => goto('/login')
  };

  page.subscribe(async v => {
    await tick();
    guard(v.path, $session.user, options)
  });
</script>

<Nav {segment} />
<div class="container">
  <div class="row" style="margin-top: 1rem;">
    <slot />
  </div>
</div>
<Footer />
