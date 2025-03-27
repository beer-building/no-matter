<script lang="ts">
  import { Sidebar } from "@/lib/blocks/sidebar";
</script>

<div class="wrapper">
  <div class="sidebar">
    <Sidebar />
  </div>
  <div class="content">
    <slot />
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    height: 100vh;
  }
  .sidebar {
    height: 100%;
  }
  .content {
    background-color: var(--color-surface);
    flex: 1;
    min-width: 0;
  }
</style>
