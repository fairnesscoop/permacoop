<script>
  import {user} from '../store';

  export let roles = [];
</script>

{#if process.browser && $user}
  {#if roles.includes($user.role)}
    <slot />
  {:else}
    <div class="alert alert-danger" role="alert" style="width:100%">
      <div class="alert-heading h4">Accès interdit !</div>
      Vous n'avez pas les droits suffisants pour accéder à cette ressource.
    </div>
  {/if}
{/if}
