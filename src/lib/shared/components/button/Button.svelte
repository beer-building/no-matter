<script lang="ts">
  export let type: "button" | "submit" = "button";
  export let style: "filled" | "outline" | "icon" = "filled";
  export let size: "small" | "default" | "large" = "default";
</script>

<button {type} class="style__{style} size__{size}" on:click>
  <slot />
</button>

<style lang="postcss">
  button {
    appearance: none;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform var(--transition);
    border: none;

    &:not(:disabled) {
      cursor: pointer;
    }
    &:not(:disabled):active {
      transform: scale(0.98);
    }
  }

  .style__icon {
    height: 36px;
    width: 36px;
    border-radius: var(--radius);

    & :global(svg path) {
      fill: var(--color-text);
    }

    &:hover {
      background: var(--color-hover);
    }
  }

  .style__filled {
    background: var(--color-accent);
    border-radius: var(--radius);
    color: var(--color-surface);
    box-shadow:
      rgba(62, 62, 62, 0.1) 0px -2.4px 0px 0px inset,
      rgba(40, 40, 40, 0.2) 0px 1px 3px 0px,
      oklch(from var(--color-accent) calc(l - 0.1) c h) 0px 0px 0px 1px;
  }

  .size__default {
    padding: 0 var(--padding-m);
    height: 36px;
    gap: var(--padding-s);
  }
</style>
