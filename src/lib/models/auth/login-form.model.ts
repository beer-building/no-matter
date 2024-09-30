import { createEvent, createStore, sample } from "effector";
import { reset } from "patronum";

import { createPersistedStore } from "@/lib/shared/helpers/store";

import { loginFx } from "./auth.api";

export const $serverUrl = createPersistedStore("serverUrl", "");
export const $formErrors = createStore<Partial<{
	url: string;
	credentials: string;
}> | null>({ url: "", credentials: "" });

export const formInputChanged = createEvent<"url" | "credentials">();
export const beforeSubmitValidated = createEvent<{
	username: string;
	password: string;
}>();
export const login = createEvent<{ username: string; password: string }>();

sample({
	clock: formInputChanged,
	source: $formErrors,
	fn: (formErrors, field) => ({ ...formErrors, [field]: "" }),
	target: $formErrors
});

sample({
	clock: loginFx.failData,
	fn: (data) => {
		const error = String(data);

		if (error === "Error: Enter a valid email or username and/or password.") {
			return {
				credentials: "Enter a valid email or username and/or password."
			};
		}

		return null;
	},
	target: $formErrors
});

sample({
	clock: login,
	source: $serverUrl,
	filter: (serverUrl: string, loginData: { username: string; password: string }) =>
		Boolean(serverUrl && loginData.username && loginData.password),
	fn: (_: string, loginData: { username: string; password: string }) => loginData,
	target: beforeSubmitValidated
});

sample({
	clock: login,
	source: $serverUrl,
	fn: (serverUrl: string, loginData: { username: string; password: string }) => {
		const errors: Partial<{ credentials: string; url: string }> = {};

		if (!loginData.username || !loginData.password) {
			errors.credentials = "Can't be empty";
		}

		if (!serverUrl) {
			errors.url = "Can't be empty";
		}

		return errors;
	},
	target: $formErrors
});

reset({
	clock: loginFx.done,
	target: $formErrors
});
