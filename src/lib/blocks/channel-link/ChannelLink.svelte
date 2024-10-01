<script lang="ts">
import { type Channel, ChannelType } from "@/lib/models/channels/types";
import { page } from "$app/stores";

import ChannelComponent from "./Channel.svelte";
import Direct from "./Direct.svelte";
import Group from "./Group.svelte";

export let channel: Channel;

const channels = [ChannelType.publicChannel, ChannelType.privateChannel];

$: href = channels.includes(channel.type)
  ? `/app/channels/${channel.urlId}`
  : `/app/messages/${channel.urlId}`;
</script>

<a {href} class:active={href === $page.url.pathname}>
  {#if channel.type === ChannelType.directMessage}
    <Direct {channel} />
  {:else if channel.type === ChannelType.group}
    <Group {channel} />
  {:else}
    <ChannelComponent {channel} />
  {/if}
</a>

<style lang="postcss">
a {
  appearance: none;
  text-decoration: none;
  color: var(--color-text);
  padding: var(--padding-s);
  height: 30px;
  display: flex;
  align-items: center;
  border-radius: var(--radius);

  &:hover,
  &.active {
    background: var(--color-hover);
  }
}
</style>
