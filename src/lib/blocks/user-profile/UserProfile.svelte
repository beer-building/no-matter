<script lang="ts">
  import { providerModel } from "@/lib/models/provider";
  import { Avatar } from "@/lib/shared/components/avatar";
  import type { UserProfile } from "@mattermost/types/users";

  export let user: UserProfile;
</script>

<button on:click>
  <Avatar
    src={providerModel.client.getProfilePictureUrl(
      user.id,
      user.last_picture_update,
    )}
  />

  <span>
    {user.first_name}
    {" "}
    {user.last_name}
  </span>
</button>

<style>
  button {
    appearance: none;
    background: none;
    border: none;
    color: var(--color-text);
    display: flex;
    align-items: center;
    gap: var(--padding-s);
    width: 100%;
    text-align: left;
    padding: var(--padding-s);
    border-radius: var(--radius);

    &:hover {
      background: var(--color-hover);
    }
  }
  span {
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
