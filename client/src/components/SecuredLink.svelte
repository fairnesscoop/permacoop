<script>
  import {stores} from '@sapper/app';

  const { session } = stores();

  export let href;
  export let className = '';
  export let roles = [];
</script>

{#if process.browser && $session.user}
  {#if roles.includes($session.user.scope)}
    <a class={className} {href}>
      <slot />
    </a>
  {/if}
{/if}
