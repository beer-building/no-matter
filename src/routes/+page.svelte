<div data-tauri-drag-region style="height: 36px; width: 100%;"></div>
<div class="container">
	<h1>Welcome to Tauri!</h1>

	<a href="/app">GOTO APP</a>
	<a href="/app">GOTO LOGIN</a>

	<div class="row">
		<a href="https://vitejs.dev" target="_blank">
			<img src="/vite.svg" class="logo vite" alt="Vite Logo" />
		</a>
		<a href="https://tauri.app" target="_blank">
			<img src="/tauri.svg" class="logo tauri" alt="Tauri Logo" />
		</a>
		<a href="https://kit.svelte.dev" target="_blank">
			<img src="/svelte.svg" class="logo svelte-kit" alt="SvelteKit Logo" />
		</a>
	</div>

	<p>Click on the Tauri, Vite, and SvelteKit logos to learn more.</p>
</div>

<style>
.logo.vite:hover {
	filter: drop-shadow(0 0 2em #747bff);
}

.logo.svelte-kit:hover {
	filter: drop-shadow(0 0 2em #ff3e00);
}

:root {
	font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
	font-size: 16px;
	line-height: 24px;
	font-weight: 400;

	color: #0f0f0f;
	background-color: #f6f6f6;

	font-synthesis: none;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	-webkit-text-size-adjust: 100%;
}

.container {
	margin: 0;
	padding-top: 10vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
}

.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: 0.75s;
}

.logo.tauri:hover {
	filter: drop-shadow(0 0 2em #24c8db);
}

.row {
	display: flex;
	justify-content: center;
}

a {
	font-weight: 500;
	color: #646cff;
	text-decoration: inherit;
}

a:hover {
	color: #535bf2;
}

h1 {
	text-align: center;
}

@media (prefers-color-scheme: dark) {
	:root {
		color: #f6f6f6;
		background-color: #2f2f2f;
	}

	a:hover {
		color: #24c8db;
	}
}
</style>
