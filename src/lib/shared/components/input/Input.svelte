<script lang="ts">
	export let value = '';
	export let placeholder = '';
	export let type: 'text' | 'number' = 'text';
</script>

<label>
	<input {placeholder} {type} {value} />
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
