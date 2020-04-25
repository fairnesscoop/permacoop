<script>
  import {user} from '../../store';

  export let href;
  export let className = '';
  export let roles = [];
</script>

{#if process.browser && $user}
  {#if roles.includes($user.role)}
    <a class={className} {href}>
      <slot />
    </a>
  {/if}
{/if}
