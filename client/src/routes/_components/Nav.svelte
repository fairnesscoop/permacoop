<script>
  import {user} from '../../store';
  import {TokenStorage} from '../../utils/tokenStorage';

  export let segment;
  let grantedRoles = ['cooperator', 'employee'];

  const handleLogout = () => {
    TokenStorage.remove();
    $user = null;
  };
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
  <a class="navbar-brand" href=".">
    <img
      src="/images/logo.png"
      height="30"
      class="d-inline-block align-top"
      alt="Permacoop" />
    Permacoop
  </a>
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#nav"
    aria-expanded="false"
    aria-label="Toggle navigation">
    <span class="navbar-toggler-icon" />
  </button>
  {#if process.browser && $user}
    <div class="collapse navbar-collapse" id="nav">
      <ul class="navbar-nav mr-auto">
        {#if grantedRoles.includes($user.role)}
          <li class="nav-item {segment === 'faircalendar' ? 'active' : ''}">
            <a class="nav-link" href="faircalendar">FairCalendar</a>
          </li>
        {/if}
        <li
          class="nav-item dropdown {segment === 'accounting' ? 'active' : ''}">
          <a
            class="nav-link dropdown-toggle"
            href="javascript:void"
            role="button"
            data-toggle="dropdown">
            Comptabilité
          </a>
          <div class="dropdown-menu">
            {#if ['cooperator', 'accountant'].includes($user.role)}
              <a class="dropdown-item" href="accounting/pay_stubs">
                Fiches de paies
              </a>
            {/if}
            {#if grantedRoles.includes($user.role)}
              <a class="dropdown-item" href="accounting/quotes">Devis</a>
              <a class="dropdown-item" href="accounting/daily_rates">TJM</a>
            {/if}
          </div>
        </li>
        {#if grantedRoles.includes($user.role)}
          <li class="nav-item {segment === 'projects' ? 'active' : ''}">
            <a class="nav-link" href="projects">Projets</a>
          </li>
          <li class="nav-item {segment === 'customers' ? 'active' : ''}">
            <a class="nav-link" href="customers">Clients</a>
          </li>
          <li class="nav-item {segment === 'tasks' ? 'active' : ''}">
            <a class="nav-link" href="tasks">Missions</a>
          </li>
          <li class="nav-item {segment === 'users' ? 'active' : ''}">
            <a class="nav-link" href="users">Utilisateurs</a>
          </li>
        {/if}
      </ul>
      <ul class="navbar-nav justify-content-end">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="javascript:void"
            role="button"
            data-toggle="dropdown">
            {`${$user.firstName} ${$user.lastName}`}
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <a class="dropdown-item" href="profile">Mon profil</a>
            <a class="dropdown-item" href={''}>Mes fiches de paies</a>
            <div class="dropdown-divider" role="separator" />
            <a
              class="dropdown-item"
              on:click={() => handleLogout()}
              href="login">
              Se déconnecter
            </a>
          </div>
        </li>
      </ul>
    </div>
  {/if}
</nav>
