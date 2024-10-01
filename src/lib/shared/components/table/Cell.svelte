<script lang="ts">
export let pale = false;
export let colspan: number | undefined = undefined;
export let align: "left" | "right" = "left";
export let width = "auto";
</script>

<td class:pale {colspan} style:text-align={align} style:width on:click on:dblclick>
  <slot />
</td>

<style>
.pale {
  color: oklch(from var(--color-text) l c h / 40%);
}
</style>
