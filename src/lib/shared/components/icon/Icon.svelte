<script lang="ts">
	export let name = '';
	export let size = 20;

	let svgContent = '';

	const loadIcon = async (name: string) => {
		const module = await import(`./icons/${name}.svg?raw`);
		svgContent = module.default;
	};

	$: loadIcon(name);
</script>

<div class="icon" style:--size="{size}px">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html svgContent}
</div>

<style lang="postcss">
	.icon {
		display: flex;

		& :global(svg) {
			height: var(--size);
			width: var(--size);
		}
	}
</style>
