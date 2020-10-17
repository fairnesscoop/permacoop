<script context="module">
  export const preload = async ({}, { user }) => {
    return {
      token: user.apiToken,
    };
  };
</script>

<script>
  import { goto } from "@sapper/app";
  import Breadcrumb from "../../components/Breadcrumb.svelte";
  import { post } from "../../utils/axios";
  import Form from "./_Form.svelte";
  import { errorNormalizer } from "../../normalizer/errors";
  import ServerErrors from "../../components/ServerErrors.svelte";

  export let token;

  const title = "Ajouter une mission";
  let errors = [];

  const onSave = async (e) => {
    try {
      await post("tasks", e.detail, token);
      goto("/tasks");
    } catch (error) {
      errors = errorNormalizer(error);
    }
  };
</script>

<svelte:head>
  <title>{title} - Permacoop</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items="{[{ title: 'Missions', path: 'tasks' }, { title }]}" />
  <ServerErrors errors="{errors}" />
  <Form on:save="{onSave}" />
</div>
