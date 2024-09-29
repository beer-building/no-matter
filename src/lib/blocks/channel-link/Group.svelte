<script lang="ts">
  import { authModel } from "@/lib/models";
  import type { Channel } from "@/lib/models/channels/types";
  import { getFullName } from "@/lib/models/users/users.helpers";

  export let channel: Channel;

  const user = authModel.$user;

  $: users = channel.users.filter(({ id }) => id !== $user?.id);
</script>

<div class="wrapper">
  <div class="count">{users.length}</div>

  <div class="names">
    {users.map((user) => getFullName(user) ?? user?.username).join(", ")}
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    gap: var(--padding-s);
    align-items: center;
    width: 100%;
  }
  .count {
    --size: 20px;
    height: var(--size);
    width: var(--size);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-panel);
    font-size: 0.8rem;
    font-weight: bold;
    border-radius: calc(var(--radius) / 2);
  }
  .names {
    flex: 1;
    min-width: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
