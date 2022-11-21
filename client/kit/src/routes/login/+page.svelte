<script lang="ts">
  import Cookies from "js-cookie";
  import { gotoSapper } from "$lib/navigation";
  import { _ } from "$lib/i18n";
  import { post, type AxiosError } from "$lib/axios";
  import { errorNormalizer } from "$lib/errors/normalizer";
  import ServerErrors from "src/components/ServerErrors.svelte";
  import Input from "src/components/inputs/Input.svelte";
  import Button from "src/components/inputs/Button.svelte";

  let errors: string[] = [];
  let email = "";
  let password = "";
  let loading = false;

  const handleSubmit = async () => {
    try {
      loading = true;

      const {
        data: { apiToken },
      } = await post("login", { email, password });

      Cookies.set("permacoop_token", apiToken, {
        expires: 365,
        secure: process.env.NODE_ENV === "production",
      });

      await gotoSapper("/");
    } catch (e) {
      errors = errorNormalizer(e as AxiosError);
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>{$_("login.title")} - {$_("app")}</title>
</svelte:head>

<div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
  <div
    class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800"
  >
    <div class="flex flex-col overflow-y-auto md:flex-row">
      <div class="h-32 md:h-auto md:w-1/2">
        <img
          aria-hidden="true"
          class="object-cover w-full h-full"
          src="images/login-office.jpeg"
          alt="Office"
        />
      </div>
      <form
        on:submit|preventDefault={handleSubmit}
        class="flex items-center justify-center p-6 sm:p-12 md:w-1/2"
      >
        <div class="w-full">
          <h1 class="mb-5 text-xl font-semibold text-center text-gray-700 dark:text-gray-200">
            {$_("login.sub_title")}
          </h1>
          <ServerErrors {errors} />
          <Input type="email" label={$_("login.form.email")} required bind:value={email} />
          <Input type="password" label={$_("login.form.password")} required bind:value={password} />
          <Button value={$_("login.form.button")} {loading} disabled={loading} />
          <hr class="my-8" />
        </div>
      </form>
    </div>
  </div>
</div>
