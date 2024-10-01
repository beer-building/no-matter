<script lang="ts">
import { authModel } from "@/lib/models";
import { Button } from "@/lib/shared/components/button";
</script>

<h1>Settings</h1>

<Button on:click={() => authModel.logout()}>logout</Button>
