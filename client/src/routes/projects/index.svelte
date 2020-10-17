<script context="module">
  export const preload = async ({ query }, { user }) => {
    return {
      page: query.page || 1,
      token: user.apiToken,
    };
  };
</script>

<script>
  import { onMount } from "svelte";
  import { get } from "../../utils/axios";
  import { errorNormalizer } from "../../normalizer/errors";
  import Loader from "../../components/Loader.svelte";
  import ServerErrors from "../../components/ServerErrors.svelte";
  import Breadcrumb from "../../components/Breadcrumb.svelte";
  import SecuredLink from "../../components/SecuredLink.svelte";
  import Pagination from "../../components/Pagination.svelte";
  import { historyPushState } from "../../utils/url";
  import Table from "./_Table.svelte";
  import { ROLE_COOPERATOR, ROLE_EMPLOYEE } from "../../constants/roles";

  export let page;
  export let token;

  const title = "Projets";
  let loading;
  let errors = [];
  let response = {
    items: [],
    totalItems: 0,
    pageCount: 0,
  };

  const fetchProjects = async () => {
    try {
      loading = true;
      response = (await get("projects", { params: { page } }, token)).data;
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };

  onMount(async () => {
    fetchProjects();
  });

  const changePage = async (e) => {
    page = e.detail;
    historyPushState("projects", { page });
    fetchProjects();
  };
</script>

<svelte:head>
  <title>{title} - Permacoop</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items="{[{ title }]}" />
  <div class="row">
    <div class="col-md-8">
      <h3>{title} <small>({response.totalItems})</small></h3>
    </div>
    <div class="col-md-4">
      <SecuredLink
        className="btn btn-primary float-right mb-3"
        href="projects/add"
        roles="{[ROLE_COOPERATOR, ROLE_EMPLOYEE]}"
      >
        + Ajouter un projet
      </SecuredLink>
    </div>
  </div>
  <ServerErrors errors="{errors}" />
  <Loader loading="{loading}" />
  <Table items="{response.items}" roles="{[ROLE_COOPERATOR, ROLE_EMPLOYEE]}" />
  <Pagination
    on:change="{changePage}"
    currentPage="{page}"
    pageCount="{response.pageCount}"
  />
</div>
