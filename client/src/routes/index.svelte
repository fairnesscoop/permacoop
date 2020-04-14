<script>
  import {user} from '../store';
</script>

<svelte:head>
  <title>Permacoop</title>
</svelte:head>

{#if $user}
  <div class="col-md-12">
    <div class="jumbotron">
      <h1 class="display-5">
        {`Bonjour ${$user.firstName} ${$user.lastName} !`}
      </h1>
      <p class="lead">
        Bienvenue sur
        <a href="https://github.com/fairnesscoop/permacoop" target="_blank">
          Permacoop
        </a>
        , solution ERP open-source et éco-conçu pour gérer votre coopérative.
      </p>
    </div>
  </div>
{/if}
