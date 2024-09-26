<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { generateMonthsByYear } from './helpers';
	import { Icon } from '../icon';
	import { fly } from 'svelte/transition';
	import { clickOutside } from '../../directives/clickoutside';
	import { isSameMonth } from 'date-fns/isSameMonth';

	export let value: Date;

	const months = generateMonthsByYear(new Date().getFullYear());

	const monthFormatter = Intl.DateTimeFormat(globalThis?.navigator?.language, {
		month: 'long'
	});
	const capitalize = (value: string): string =>
		value[0].toUpperCase() + value.slice(1).toLowerCase();
	const format = (date: Date) => `${capitalize(monthFormatter.format(date))} ${date.getFullYear()}`;

	const dispatch = createEventDispatcher();

	let isOpen = false;
</script>

<div class="wrapper">
	<button class="control" on:click={() => (isOpen = !isOpen)} type="button">
		<span>{format(value)}</span>
		<Icon name="select" size={20} />
	</button>

	{#if isOpen}
		<ul
			class="popup"
			transition:fly={{ duration: 100, y: -10 }}
			use:clickOutside={() => (isOpen = false)}
		>
			{#each months as month}
				<li>
					<button
						class:active={isSameMonth(month, value)}
						type="button"
						on:click={() => {
							dispatch('change', month);
							isOpen = false;
						}}
					>
						<Icon name="check" size={18} />
						{format(month)}</button
					>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="postcss">
	.wrapper {
		position: relative;
	}

	.control {
		appearance: none;
		border: 1px solid var(--color-separator);
		background: none;
		color: var(--color-text);
		display: flex;
		gap: var(--padding-s);
		border-radius: var(--radius);
		height: 36px;
		align-items: center;
	}

	.popup {
		position: absolute;
		top: 100%;
		left: 0;
		min-width: 100%;
		list-style: none;
		padding: var(--padding-s);
		margin: var(--padding-s) 0 0;
		background-color: var(--color-panel);
		border-radius: var(--radius);
		border: 1px solid var(--color-separator);
		box-shadow: var(--shadow-s);

		& li {
			& button {
				color: var(--color-text);
				text-align: left;
				width: 100%;
				appearance: none;
				background: none;
				border: none;
				border-radius: var(--radius);
				display: flex;
				gap: var(--padding-s);
				align-items: center;
				white-space: nowrap;
				height: 32px;

				& :global(svg) {
					visibility: hidden;

					& :global(path) {
						fill: var(--color-accent);
					}
				}

				&:hover {
					background-color: oklch(from var(--color-accent) l c h / 10%);
				}

				&.active {
					background-color: oklch(from var(--color-accent) l c h / 10%);
					color: var(--color-accent);

					& :global(svg) {
						visibility: visible;
					}
				}
			}
		}
	}
</style>
