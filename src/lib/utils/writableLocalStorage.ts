import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const writableLocalStorage = <T>(initialState: T, key: string) => {
	if (!browser) {
		return writable(initialState);
	}
	const item = localStorage.getItem(key);
	let state = initialState;
	if (item !== null) {
		try {
			const { data } = JSON.parse(item);
			state = data;
		} catch (e) {
			console.error(e);
		}
	}
	const { set, subscribe, update } = writable(state);

	return {
		subscribe,
		set(value: T) {
			localStorage.setItem(key, JSON.stringify({ data: value }));
			set(value);
		},
		update(updater: (value: T) => T) {
			update((v) => {
				const newValue = updater(v);
				localStorage.setItem(key, JSON.stringify({ data: newValue }));
				return newValue;
			});
		},
	};
};
