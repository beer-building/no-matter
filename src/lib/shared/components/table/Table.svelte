<script lang="ts">
</script>

<table>
	<slot />
</table>

<style>
	table {
		min-width: 100%;
		text-indent: 0;
		border-color: inherit;
		border-collapse: collapse;

		--cell-padding: 0.5rem;
	}

	table :global(td) {
		padding: var(--cell-padding);
		color: var(--color-text);

		&:first-of-type {
			padding-left: 0;
		}

		&:last-of-type {
			padding-right: 0;
		}
	}
</style>
