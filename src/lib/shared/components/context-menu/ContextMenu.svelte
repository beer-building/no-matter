<script lang="ts">
import { setContext } from "svelte";

setContext("menu", {
  close: () => {}
});
</script>

<ul class="wrapper">
  <slot />
</ul>

<style lang="postcss">
ul {
  margin: 0;
  list-style: none;
  margin: 0;
  padding: var(--padding-s);
  border-radius: var(--radius);
  background: var(--color-panel);
  border: 1px solid var(--color-separator);
  box-shadow: var(--shadow-s);
  min-width: 150px;
}
</style>
