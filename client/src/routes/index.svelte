<script>
  import { stores } from '@sapper/app';

  const { session } = stores();
</script>

<svelte:head>
  <title>Permacoop</title>
</svelte:head>

{#if $session.user}
  <div class="col-md-12">
    <div class="jumbotron">
      <h1 class="display-5">
        {`Bonjour ${$session.user.firstName} ${$session.user.lastName} !`}
      </h1>
      <p class="lead">
        Bienvenue sur Permacoop, solution ERP
        <a href="https://github.com/fairnesscoop/permacoop" target="_blank">
          open-source
        </a>
        et éco-conçu pour gérer votre coopérative.
        <br />
        Pour toutes questions ou suggestions d'améliorations, n'hésitez pas à
        nous écrire à
        <a href="mailto:equipe@fairness.coop">equipe@fairness.coop</a>
        .
      </p>
    </div>
  </div>
{/if}
