<script lang="ts">
  import { Resizable } from "@/lib/shared/components/resizable";
  import { UserProfile } from "../user-profile";
  import { Button } from "@/lib/shared/components/button";
  import { Icon } from "@/lib/shared/components/icon";
  import { goto } from "$app/navigation";
  import { channelsModel, authModel, teamModel } from "@/lib/models";
  import { Category } from "@/lib/shared/components/category";
  import { ChannelLink } from "../channel-link";

  const user = authModel.$user;
  const categories = channelsModel.$categories;
  const channels = channelsModel.$channels;
  const teams = teamModel.$teams;

  $: console.log("MAPPED CHANNLES", $channels);
  $: console.log("USER", $user);
  $: console.log("CATEGORIES", $categories);
  $: console.log("TEAMS", $teams);
</script>

<Resizable id="sidebar">
  <div class="wrapper">
    <div class="top">
      <div data-tauri-drag-region class="draggable" />
      <div class="profile">
        {#if $user}
          <UserProfile user={$user} />
        {/if}
      </div>

      <div class="channels">
        {#each $categories as category}
          <Category label={category.display_name}>
            <ul>
              {#each $channels.filter( (e) => category.channel_ids.includes(e.id), ) as channel}
                <li>
                  <ChannelLink {channel} />
                </li>
              {/each}
            </ul>
          </Category>
        {/each}
      </div>
    </div>
    <div class="bottom">
      <Button style="icon" on:click={() => goto("/app/settings")}>
        <Icon name="settings" />
      </Button>
    </div>
  </div>
</Resizable>

<style>
  .draggable {
    height: 36px;
    width: 100%;
  }
  .wrapper {
    background-color: oklch(from var(--color-panel) l c h / 10%);
    height: 100%;
    max-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .channels {
    overflow: auto;
    flex: 1;
    width: 100%;

    & ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }
  }

  .top {
    min-height: 0;
    min-width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .profile {
    padding: var(--padding-s);
  }

  .bottom {
    min-width: 0;
    padding: var(--padding-s);
  }
</style>
