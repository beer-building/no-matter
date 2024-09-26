<script lang="ts">
  import { authModel } from "@/lib/models/auth";
  import Button from "@/lib/shared/components/button/Button.svelte";
  import { Input } from "@/lib/shared/components/input";

  let username = "";
  let password = "";

  const serverUrl = authModel.$serverUrl;

  const onLogin = () => {
    if (!username || !password) {
      return;
    }

    authModel.login({ username, password });
  };
</script>

<div class="page">
  <form on:submit|preventDefault={() => onLogin()}>
    <Input
      type="text"
      value={$serverUrl}
      on:change={({ detail }) => authModel.setServerUrl(detail)}
      placeholder="Server"
    />
    <Input
      type="text"
      value={username}
      on:change={({ detail }) => (username = detail)}
      placeholder="Username"
    />
    <Input
      type="text"
      value={password}
      on:change={({ detail }) => (password = detail)}
      placeholder="Password"
    />

    <Button type="submit">Login</Button>
  </form>
</div>

<style lang="postcss">
  .page {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  form {
    margin: auto;
    display: flex;
    flex-direction: column;
    max-width: 300px;
    width: 100%;
    gap: var(--padding-s);

    & :global(button) {
      margin-top: var(--padding-m);
    }
  }
</style>
