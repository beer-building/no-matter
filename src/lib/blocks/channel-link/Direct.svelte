<script lang="ts">
  import type { Channel } from "@/lib/models/channels/types";
  import { providerModel } from "@/lib/models/provider";
  import { getFullName } from "@/lib/models/users/users.helpers";
  import { Avatar } from "@/lib/shared/components/avatar";
  import { loadAuthImage } from "@/lib/shared/helpers/load-auth-image";

  export let channel: Channel;

  $: user = channel.users[0];

  let image: string = "";

  $: loadImage(
    providerModel.client.getProfilePictureUrl(
      user?.id,
      user?.last_picture_update,
    ),
  );

  const loadImage = async (src: string) => {
    loadAuthImage(src, (newImage) => {
      image = newImage;
    });
  };
</script>

<div class="wrapper">
  <Avatar src={image} size={20} />

  <div class="name">
    {getFullName(user) || user?.username}
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    align-items: center;
    gap: var(--padding-s);
  }

  .name {
    flex: 1;
    min-width: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
