import { createStore, type EventCallable } from 'effector';

const tryOr = <T>(fn: () => T, fallback: T): T => {
	try {
		return fn();
	} catch (_) {
		return fallback;
	}
};

type Options = Partial<{
	initEvent: EventCallable<void>;
}>;

export const createPersistedStore = <T>(key: string, defaultState: T, options?: Options) => {
	if (typeof localStorage === 'undefined') {
		return createStore(defaultState);
	}

	const $store = createStore(
		tryOr(() => JSON.parse(localStorage.getItem(key) || ''), defaultState)
	);

	$store.watch((state) => {
		localStorage.setItem(key, JSON.stringify(state));
	});

	if (options?.initEvent) {
		setTimeout(() => {
			options!.initEvent!();
		});
	}

	return $store;
};
