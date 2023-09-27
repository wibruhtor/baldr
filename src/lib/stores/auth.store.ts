import { writable } from 'svelte/store';
import { Buffer } from 'buffer';
import { protectedRoutes } from '$lib/utils/protectionRoutes';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';

export type AuthStore = {
	isLoggedIn: boolean;
	accessToken: string | null;
	refreshToken: string | null;
	sessionId: string | null
	userId: string | null;
	username: string | null;
};

const initialState: AuthStore = {
	isLoggedIn: false,
	accessToken: null,
	refreshToken: null,
	sessionId: null,
	userId: null,
	username: null,
};

const createAuthStore = () => {
	const { set, subscribe } = writable(initialState);

	return {
		subscribe,
		set(accessToken: string, refreshToken: string, withSet: boolean = false) {
			if (browser && withSet) {
				fetch('/api/auth/token', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ accessToken, refreshToken }),
				});
			}
			const rawPayload = Buffer.from(accessToken.split('.')[1], 'base64').toString('utf-8');
			const { jti, sub, username } = JSON.parse(rawPayload);

			set({ isLoggedIn: true, accessToken, refreshToken, sessionId: jti, userId: sub, username });
		},
		clear() {
			if (browser) {
				fetch('/api/auth/token', { method: 'DELETE' });
				for (const i in protectedRoutes) {
					const r = protectedRoutes[i];
					if (location.pathname.startsWith(r)) {
						goto('/')
					}
				}
			}
			set(initialState);
		},
	};
};

export const authStore = createAuthStore();
