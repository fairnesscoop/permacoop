<script>
  import Nav from '../components/Nav.svelte';
  import Footer from '../components/Footer.svelte';
  export let segment;
</script>

<Nav {segment} />

<div class="container">
  <div class="row" style="margin-top: 1rem;">
    <slot />
  </div>
</div>
<Footer />
