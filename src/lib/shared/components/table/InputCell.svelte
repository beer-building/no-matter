<script lang="ts">
import { createEventDispatcher } from "svelte";

export let autofocus = false;
export let placeholder = "";
export let value = "";
export let align: "left" | "right" = "left";
export let width = "auto";
export let selectAll = false;

let ref: HTMLInputElement;

$: {
	if (selectAll) {
		ref?.select();
	}
}

const dispatch = createEventDispatcher();

const onChange = (e: Event) => {
	const input = e.target as HTMLInputElement;
	dispatch("change", input.value);
	input.value = value;
};
</script>

<td style:text-align={align} style:width>
	<!-- svelte-ignore a11y-autofocus -->
	<input
		type="text"
		bind:this={ref}
		{autofocus}
		on:blur
		on:keydown
		on:input={onChange}
		{placeholder}
		{value}
	/>
</td>

<style>
td {
	box-shadow: inset 0 0 0 1px var(--color-accent);
}
input {
	width: 100%;
	outline: none;
	appearance: none;
	border: none;
	background: transparent;
	height: 100%;
	margin: 0;
	padding: 0;
	text-align: inherit;
	color: inherit;
}
</style>
