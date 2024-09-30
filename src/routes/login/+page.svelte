<script lang="ts">
import { authModel, loginFormModel } from "@/lib/models/auth";
import Button from "@/lib/shared/components/button/Button.svelte";
import { Input } from "@/lib/shared/components/input";

let username = "";
let password = "";

const serverUrl = loginFormModel.$serverUrl;
const formErrors = loginFormModel.$formErrors;
const pending = authModel.$pending;

$: isDisabled = Boolean(
	!username || !password || $formErrors?.credentials || $formErrors?.url || $pending
);

const onLogin = () => {
	if (isDisabled) {
		return;
	}

	loginFormModel.login({ username, password });
};
</script>

<div class="page">
	<form on:submit|preventDefault={() => onLogin()}>
		<Input
			type="text"
			value={$serverUrl}
			on:change={({ detail }) => {
				loginFormModel.formInputChanged("url");
				authModel.setServerUrl(detail);
			}}
			placeholder="Server"
			errorMessage={$formErrors?.url}
		/>
		<Input
			type="text"
			value={username}
			on:change={({ detail }) => {
				loginFormModel.formInputChanged("credentials");
				return (username = detail);
			}}
			placeholder="Username"
			errorMessage={$formErrors?.credentials}
		/>
		<Input
			type="password"
			value={password}
			on:change={({ detail }) => {
				loginFormModel.formInputChanged("credentials");
				return (password = detail);
			}}
			placeholder="Password"
			errorMessage={$formErrors?.credentials}
		/>

		<Button type="submit" disabled={isDisabled}>Login</Button>
	</form>
</div>

<style lang="postcss">
.page {
	min-height: 100vh;
	display: flex;
	align-items: center;
}
form {
	margin: auto;
	display: flex;
	flex-direction: column;
	max-width: 300px;
	width: 100%;
	gap: var(--padding-s);

	& :global(button) {
		margin-top: var(--padding-m);
	}
}
</style>
