import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type ThemeValue = 'system' | 'dark' | 'light';
export type Theme = Omit<ThemeValue, 'system'>;

const getInitialTheme = () => {
	if (!browser) return 'system';
	const html = document.querySelector('html')!;
	const classList = html.classList;
	if (classList.contains('dark')) return 'dark';
	if (classList.contains('light')) return 'light';
	return 'system';
};

const createTheme = () => {
	const { set, subscribe } = writable(getInitialTheme());

	let controller: AbortController | null = null;

	const setCookie = (value: ThemeValue) => {
		if (controller !== null) {
			controller.abort();
		}
		controller = new AbortController();
		const url = new URL(location.origin);
		url.pathname = '/api/theme';
		url.searchParams.set('theme', value);
		fetch(url, { method: 'POST', signal: controller.signal });
	};

	subscribe((theme) => {
		if (!browser) return;
		const html = document.querySelector('html')!;
		if (html.classList.contains(theme)) return;
		html.removeAttribute('class');
		html.classList.add(theme);
	});

	return {
		subscribe,
		set(value: ThemeValue) {
			setCookie(value);
			set(value);
		},
	};
};

export const theme = createTheme();
