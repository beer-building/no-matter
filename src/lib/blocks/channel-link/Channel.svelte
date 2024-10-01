<script lang="ts">
import { type Channel, ChannelType } from "@/lib/models/channels/types";
import { Icon } from "@/lib/shared/components/icon";

export let channel: Channel;
</script>

<div class="wrapper">
  <div class="icon">
    <Icon name={channel.type === ChannelType.publicChannel ? "globe" : "lock"} size={18} />
  </div>
  <div class="name">{channel.name}</div>
</div>

<style>
.icon {
  --size: 20px;
  width: var(--size);
  height: var(--size);
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrapper {
  display: flex;
  gap: var(--padding-s);
  align-items: center;
  width: 100%;
}
.name {
  flex: 1;
  min-width: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
