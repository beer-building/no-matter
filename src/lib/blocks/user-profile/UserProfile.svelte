<script lang="ts">
  import { providerModel } from "@/lib/models/provider";
  import { Avatar } from "@/lib/shared/components/avatar";
  import { loadAuthImage } from "@/lib/shared/helpers/load-auth-image";
  import type { UserProfile } from "@mattermost/types/users";
  import { onDestroy } from "svelte";

  export let user: UserProfile;

  let unsuscribe: () => void;

  let image: string = "";
  $: loadImage(
    providerModel.client.getProfilePictureUrl(
      user.id,
      user.last_picture_update,
    ),
  );

  const loadImage = async (src: string) => {
    unsuscribe = await loadAuthImage(src, (newImage) => {
      image = newImage;
    });
  };

  onDestroy(() => {
    unsuscribe();
  });
</script>

<button on:click>
  <Avatar src={image} />

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
