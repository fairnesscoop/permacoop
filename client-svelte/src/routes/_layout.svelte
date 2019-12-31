<script>
  import Nav from './_components/Nav.svelte';
  import {user} from '../store';
  import Footer from './_components/Footer.svelte';
  import Login from './login/index.svelte';
  export let segment;
</script>

<Nav {segment} />

<div class="container">
  <div class="row" style="margin-top: 1rem;">
    {#if !$user}
      <Login />
    {:else}
      <slot />
    {/if}
  </div>
</div>
<Footer />
