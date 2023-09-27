// See https://kit.svelte.dev/docs/types#app

// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			requestId?: string | null;
			message: string;
			description?: string | null;
		}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
