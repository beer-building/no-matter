<script lang="ts">
export let align: "left" | "right" = "left";
export let width = "auto";
</script>

<th style:text-align={align} style:width>
  <slot />
</th>

<style>
th {
  color: var(--color-title);
  padding: var(--cell-padding);
  text-align: left;

  &:first-of-type {
    padding-left: 0;
  }

  &:last-of-type {
    padding-right: 0;
  }
}
</style>
