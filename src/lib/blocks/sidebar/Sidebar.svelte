<script lang="ts">
  import { authModel } from "@/lib/models/auth";
  import { Resizable } from "@/lib/shared/components/resizable";
  import { UserProfile } from "../user-profile";
  import { Button } from "@/lib/shared/components/button";
  import { Icon } from "@/lib/shared/components/icon";
  import { goto } from "$app/navigation";

  const user = authModel.$user;
</script>

<Resizable id="sidebar">
  <div class="wrapper">
    <div class="top">
      {#if $user}
        <UserProfile user={$user} />
      {/if}
    </div>
    <div class="bottom">
      <Button style="icon" on:click={() => goto("/app/settings")}>
        <Icon name="settings" />
      </Button>
    </div>
  </div>
</Resizable>

<style>
  .wrapper {
    background-color: var(--color-panel);
    height: 100%;
    display: grid;
    grid-template-rows: 1fr auto;
  }

  .bottom {
    padding: var(--padding-s);
  }
</style>
