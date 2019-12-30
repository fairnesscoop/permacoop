<script>
  export let segment;
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
    data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation">
    <span class="navbar-toggler-icon" />
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
  </div>
</nav>
