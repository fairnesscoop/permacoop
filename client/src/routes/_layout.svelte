<script>
  import Nav from './_components/Nav.svelte';
  import {user} from '../store';
  import Footer from './_components/Footer.svelte';
  import Login from './login/index.svelte';
  import {stores, goto} from '@sapper/app';
  export let segment;

  const {page} = stores();

  if (typeof window !== 'undefined') {
    page.subscribe(({path}) => {
      if ('/login' !== path && !$user) {
        return goto('/login');
      }
    });
  }
</script>

<Nav {segment} />
<div class="container">
  <div class="row" style="margin-top: 1rem;">
    <slot />
  </div>
</div>
<Footer />
