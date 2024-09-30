<script lang="ts">
import { onDestroy, onMount } from "svelte";
let ref: HTMLDivElement;
let portal: HTMLDivElement;

onMount(() => {
  portal = document.createElement("div");
  portal.className = "portal";
  document.body.appendChild(portal);
  portal.appendChild(ref);
});

onDestroy(() => {
  document.body.removeChild(portal);
});
</script>

<div class="portal-clone">
  <div bind:this={ref}>
    <slot></slot>
  </div>
</div>

<style>
.portal-clone {
  display: none;
}
</style>
