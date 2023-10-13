import type { SvelteComponentConstructor } from '$lib/types/svelte-component-constructor';
import { writable } from 'svelte/store';

export type ToastStore = {
	toasts: {
		id: number;
		variant: 'default' | 'destructive';
		title: string;
		description: string | null;
		icon: SvelteComponentConstructor | null;
		closeButton: boolean;
		timeout: number;
	}[];
};

const initialState: ToastStore = { toasts: [] };

const createStore = () => {
	const { set, subscribe, update } = writable(initialState);

	return {
		subscribe,
		show(
			title: string,
			options: {
				variant?: 'default' | 'destructive';
				description?: string;
				icon?: SvelteComponentConstructor;
				closeButton?: boolean;
				timeout?: number;
			} = {},
		) {
			update((v) => {
				v.toasts.push({
					id: Date.now() + Math.random(),
					title,
					variant: options.variant || 'default',
					description: options.description || null,
					icon: options.icon || null,
					closeButton: options.closeButton || false,
					timeout: options.timeout || 0,
				});
				return v;
			});
		},
		close(id: number) {
			update((v) => {
				v.toasts = v.toasts.filter((t) => t.id !== id);
				return v;
			});
		},
		clear() {
			set(initialState);
		},
	};
};

export const toastStore = createStore();
