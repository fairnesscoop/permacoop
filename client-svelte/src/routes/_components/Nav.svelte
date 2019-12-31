<script>
  import {user} from '../../store';
  import {TokenStorage} from '../../utils/tokenStorage';

  export let segment;

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
      alt="CoopERP" />
    CoopERP
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
        <li class="nav-item {segment === 'activities' ? 'active' : ''}">
          <a class="nav-link" href="activities">CRA</a>
        </li>
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
          <a class="nav-link" href="users">Coopérateurs</a>
        </li>
      </ul>
      <ul class="navbar-nav justify-content-end">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="javascript:void"
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            {`${$user.firstName} ${$user.lastName}`}
          </a>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item" href="profile">Mon profil</a>
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
