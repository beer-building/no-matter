<script lang="ts">
import { slide } from "svelte/transition";

export let interactive = false;
export let animated = false;
</script>

<tr
  on:click
  class:interactive
  on:blur
  on:focusout
  on:focusin
  on:contextmenu
  out:slide|local={{ duration: animated ? 300 : 0 }}
>
  <slot />
</tr>

<style lang="postcss">
tr {
  display: flex;
}
.interactive {
  cursor: pointer;

  &:hover {
    background: var(--color-hover);
  }
}
:global(tbody) tr + tr {
  border-top: 1px solid var(--color-separator);
}
</style>
