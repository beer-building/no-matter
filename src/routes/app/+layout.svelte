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
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: 100vh;
}
.sidebar {
  height: 100%;
}
.content {
  background-color: var(--color-surface);
}
</style>
