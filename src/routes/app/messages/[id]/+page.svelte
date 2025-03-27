<script lang="ts">
  import { page } from "$app/stores";
  import { MessageForm } from "@/lib/blocks/message-form";
  import { MessageList } from "@/lib/blocks/message-list";
  import { channelsModel } from "@/lib/models";

  $: id = $page.params.id?.trim();
  const channels = channelsModel.$channels;
  $: channelId = $channels.find((channel) => channel.urlId === id)?.id;
</script>

<div class="page">
  <h1>{id}</h1>

  <div class="messages">
    {#if channelId}
      <MessageList {channelId} />
    {/if}
  </div>
  <div class="bottom">
    <MessageForm />
  </div>
</div>

<style>
  .page {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .messages {
    flex: 1;
    min-height: 0;
  }
</style>
