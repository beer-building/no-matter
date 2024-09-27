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
      <div data-tauri-drag-region style="height: 36px; width: 100%;"></div>
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
    background-color: oklch(from var(--color-panel) l c h / 10%);
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 1fr auto;
  }

  .top {
    min-width: 0;
  }

  .bottom {
    padding: var(--padding-s);
  }
</style>
