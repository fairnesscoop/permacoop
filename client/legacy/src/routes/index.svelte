<script context="module">
  import { redirectKit } from '../utils/redirect';

  export async function preload() {
    return redirectKit(this.redirect, '/kit');
  }
</script>
