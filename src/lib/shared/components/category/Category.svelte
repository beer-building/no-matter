<script lang="ts">
import { slide } from "svelte/transition";

import { Icon } from "../icon";

export let label = "";

let isOpen = true;
</script>

<div class="wrapper">
  <button class="label" class:open={isOpen} type="button" on:click={() => (isOpen = !isOpen)}>
    {label}
    <span> </span>
    <Icon name="chevron-down" size={16} />
  </button>

  {#if isOpen}
    <div class="content" transition:slide={{ duration: 100 }}>
      <slot />
    </div>
  {/if}
</div>

<style>
.content {
  padding: var(--padding-m);
  padding-top: var(--padding-s);
}

.label {
  appearance: none;
  font: var(--secondary-font);
  padding: 0;
  font-weight: 800;
  border: none;
  background: none;
  color: oklch(from var(--color-text) l c h / 50%);
  padding: 2px var(--padding-s);
  width: 100%;
  text-align: left;
  display: flex;
  line-height: 1.4;
  font-size: 0.8rem;
  gap: var(--padding-s);
  position: sticky;
  top: 0;
  backdrop-filter: blur(16px);

  & :global(svg) {
    transform: rotate(-90deg);
    transition: var(--transition);
    opacity: 0;
  }

  &.open {
    & :global(svg) {
      transform: rotate(0deg);
    }
  }

  & span {
    flex: 1;
  }

  &:hover {
    background: var(--color-hover);

    & :global(svg) {
      opacity: 1;
    }
  }
}
</style>
