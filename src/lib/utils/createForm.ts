import { writable } from 'svelte/store';
import type { ParseParams } from 'zod';

export type Errors<Data extends Record<string, unknown>> = {
	[Key in keyof Data]: string | null;
};

const getNullErrors = <Data extends Record<string, unknown>>(data: Data): Errors<Data> => {
	const object: Record<string, null> = {};

	Object.keys(data).forEach((key) => {
		object[key] = null;
	});

	return object as Errors<Data>;
};

export const createForm = <Data extends Record<string, unknown>>(
	data: Data,
	schema: Zod.Schema<Data>,
	params?: {
		parseParams?: Partial<ParseParams>;
		validateOnUpdate?: boolean;
	},
) => {
	const dataStore = writable(data);
	const errorsStore = writable(getNullErrors(data));

	let currentData = data;
	let currentErrors = getNullErrors(data);

	const validate = (): boolean => {
		const result = schema.safeParse(currentData, params?.parseParams);

		if (!result.success) {
			try {
				const errors = structuredClone(currentErrors);
				result.error.issues.forEach((issue) => {
					let object: Record<string | number, unknown> = errors;
					const pathWithoutLast = issue.path.slice(0, issue.path.length - 1);
					const last = issue.path[issue.path.length - 1];
					pathWithoutLast.forEach((p) => {
						object = object[p] as Record<string | number, unknown>;
					});
					if (object != null && last != null) {
						object[last] = issue.message;
					}
				});
				errorsStore.set(errors);
			} catch {
				/* empty */
			}
		} else {
			errorsStore.set(getNullErrors(data));
		}

		return result.success;
	};

	dataStore.subscribe((v) => {
		currentData = v;
		if (params?.validateOnUpdate) {
			validate();
		}
	});
	errorsStore.subscribe((v) => {
		currentErrors = v;
	});

	return {
		data: dataStore,
		errors: {
			subscribe: errorsStore.subscribe,
		},
		validate,
	};
};
