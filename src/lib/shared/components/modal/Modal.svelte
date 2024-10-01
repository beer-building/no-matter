<script lang="ts">
import { createEventDispatcher, onDestroy, onMount } from "svelte";
import { fade } from "svelte/transition";
import Portal from "svelte-portal";

import { browser } from "$app/environment";
export let title = "";

onMount(() => {
  if (!browser) return;
  document.body.style.overflow = "hidden";
});

onDestroy(() => {
  if (!browser) return;
  document.body.style.overflow = "";
});

const dispatch = createEventDispatcher();
</script>

<Portal target="body">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="wrapper" on:click={() => dispatch("close")} transition:fade={{ duration: 100 }}>
    <div class="content" on:click|stopPropagation>
      <div class="header">
        <h3 class="title">
          {title}
        </h3>
      </div>
      <div class="inner">
        <slot />
      </div>
    </div>
  </div>
</Portal>

<style>
.title {
  margin: 0;
}
.header {
  padding: var(--padding-m);
}
.wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: oklch(from var(--color-text) l c h / 15%);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: flex-end;
}
.inner {
  min-height: 0;
  flex: 1;
  overflow: auto;
}
.content {
  max-width: 500px;
  height: 100%;
  background: var(--color-surface);
  box-shadow: var(--shadow-l);
  border: 1px solid var(--color-separator);
  display: flex;
  flex-direction: column;
}
</style>
