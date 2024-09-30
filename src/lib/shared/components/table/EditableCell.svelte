<script lang="ts">
import { createEventDispatcher } from "svelte";

import Cell from "./Cell.svelte";
import InputCell from "./InputCell.svelte";

export let pale = false;
export let colspan: number | undefined = undefined;
export let align: "left" | "right" = "left";
export let value = "";
export let presentValue: string | undefined = undefined;
export let width: string = "auto";
export let selectAll = false;

export let isEditing = false;
let inputValue = value;

const dispatch = createEventDispatcher();

$: {
  inputValue = value;
}

const onDone = () => {
  isEditing = false;
  dispatch("change", inputValue);
};
</script>

{#if !isEditing}
  <Cell {align} {pale} {colspan} on:dblclick={() => (isEditing = true)} {width}>
    {presentValue ?? value}
  </Cell>
{:else}
  <InputCell
    {align}
    {width}
    {selectAll}
    autofocus
    value={inputValue}
    on:blur={onDone}
    on:keydown={({ key, shiftKey }) => {
      switch (key) {
        case "Enter":
          onDone();
          break;
        case "Escape":
          isEditing = false;
          break;
        case "Tab":
          setTimeout(() => {
            if (shiftKey) {
              dispatch("focusprev");
            } else {
              dispatch("focusnext");
            }
          });
          break;
      }
    }}
    on:change={({ detail }) => (inputValue = detail)}
  />
{/if}
