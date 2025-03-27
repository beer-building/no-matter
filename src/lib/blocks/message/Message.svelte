<script lang="ts">
  import { usersModel } from "@/lib/models";
  import { providerModel } from "@/lib/models/provider";
  import { getFullName } from "@/lib/models/users/users.helpers";
  import { Avatar } from "@/lib/shared/components/avatar";
  import type { Post } from "@mattermost/types/posts";
  const users = usersModel.$users;

  export let message: Post;
  $: user = $users.find((user) => user.id === message.user_id)!;
</script>

<div class="wrapper">
  <div class="user">
    <Avatar
      src={providerModel.client.getProfilePictureUrl(
        user.id,
        user.last_picture_update,
      )}
    />
  </div>
  <div class="content">
    <div class="info">
      <div class="user-name">{getFullName(user)}</div>
    </div>
    <div class="message">
      {message.message}
    </div>
  </div>
</div>

<style lang="postcss">
  .wrapper {
    display: flex;
    gap: var(--padding-m);
    width: 100%;
    padding: var(--padding-s);
  }
  .content {
    flex: 1;
    min-width: 0;
  }
  .user-name {
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--color-title);
  }
  .message {
    white-space: pre-wrap;
    line-height: 1.5;
  }
</style>
