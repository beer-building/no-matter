<script lang>
  import { UserProfile } from "@/lib/blocks/user-profile";
  import { authModel } from "@/lib/models/auth";
  import { Button } from "@/lib/shared/components/button";

  const user = authModel.$user;
</script>

APP

{#if $user}
  <UserProfile user={$user} />
{/if}

<Button on:click={() => authModel.logout()}>logout</Button>
