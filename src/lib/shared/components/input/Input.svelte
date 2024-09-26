<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let value = "";
  export let placeholder = "";
  export let type: "text" | "number" = "text";

  const dispatch = createEventDispatcher();

  const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement;

    dispatch("change", target.value);

    target.value = value;
  };
</script>

<label>
  <input {placeholder} {type} {value} on:input={onChange} />
</label>

<style lang="postcss">
  input {
    appearance: none;
    border-radius: var(--radius);
    border: 1px solid var(--color-separator);
    background: var(--color-panel);
    color: var(--color-title);
    outline: none;
    height: 32px;
    padding: 0 var(--padding-m);

    &:focus-visible {
      border-color: var(--color-accent);
    }
  }
</style>
