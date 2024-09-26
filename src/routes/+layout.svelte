<script lang="ts">
  import { authModel } from "@/lib/models/auth";

  const pending = authModel.$pending;
</script>

{#if $pending}
  <div class="loading">Loading</div>
{/if}
<slot />

<style>
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(10px);
    background: oklch(from var(--color-surface) l c h / 80%);
  }
</style>
