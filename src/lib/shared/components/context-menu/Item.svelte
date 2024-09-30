<script lang="ts">
import { Icon } from "../icon";

export let icon = "";
</script>

<li>
  <button type="button" on:click on:mouseup>
    {#if icon}
      <Icon name={icon} size={18} />
    {/if}
    <slot />
  </button>
</li>

<style>
button {
  width: 100%;
  height: 25px;
  display: flex;
  align-items: center;
  gap: var(--padding-s);
  border-radius: calc(var(--radius) - var(--padding-s));
  appearance: none;
  border: none;
  background: transparent;
  font: var(--base-font);
  --color: var(--color-text);
  color: var(--color);

  & :global(svg path) {
    fill: var(--color);
  }

  &:hover {
    background: var(--color-hover);
  }
}
</style>
