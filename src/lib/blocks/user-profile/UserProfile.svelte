<script lang="ts">
  import { providerModel } from "@/lib/models/provider";
  import { Avatar } from "@/lib/shared/components/avatar";
  import type { UserProfile } from "@mattermost/types/users";
  import { fetch } from "@tauri-apps/plugin-http";

  export let user: UserProfile;

  let image: string = "";

  $: loadPic(
    providerModel.client.getProfilePictureUrl(
      user.id,
      user.last_picture_update,
    ),
  );

  const loadPic = async (url: string) => {
    const res = await fetch(url);
    const blob = await res.blob();

    image = URL.createObjectURL(blob);
  };
</script>

<button>
  <Avatar src={image} />

  {user.first_name}
  {" "}
  {user.last_name}
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
  }
</style>
