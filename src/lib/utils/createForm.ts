import { writable } from 'svelte/store';
import type { ParseParams, ZodError } from 'zod';

export type ErrorMessage = string | null

export type Errors<T> = T extends Record<string, unknown> 
    ? {
        [Key in keyof T]: Errors<T[Key]>
    }
    : T extends unknown[] 
        ? {[Key in keyof T]: Errors<T[Key]>}
        : ErrorMessage;

const getNullableArray = <T extends unknown[],>(data: T): Errors<T> => {
	return data.map(v => getNullableInstanse(v)) as Errors<T>
}

const getNullableObject = <T extends Record<string |number, unknown>,>(data: T): Errors<T> => {
  const obj: Record<string |number, unknown> = {}

	Object.keys(data).forEach(key => {
		obj[key] = getNullableInstanse(data[key])
	})

	return obj as Errors<T>
}

const getNullableInstanse = <T,>(data: T): Errors<T> => {
		if (data === null || data === undefined) return null as Errors<T>
    if (Array.isArray(data)) {
        return getNullableArray(data)
    } else if (typeof data === "object") {
        return getNullableObject(data as Record<string | number, unknown>) as Errors<T>
    }
    return null as Errors<T>;
}

export const createForm = <Data extends Record<string, unknown>>(
	data: Data,
	schema: Zod.Schema<Data>,
	params?: {
		parseParams?: Partial<ParseParams>;
		validateOnUpdate?: boolean;
	},
) => {
	const dataStore = writable(data);
	const errorsStore = writable(getNullableInstanse(data));
	const zodError = writable<ZodError<Data> | null>(null);

	let currentData = data;
	let currentErrors = getNullableInstanse(data);

	const validate = (): boolean => {
		const result = schema.safeParse(currentData, params?.parseParams);

		if (!result.success) {
			zodError.set(result.error);
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
			zodError.set(null);
			errorsStore.set(getNullableInstanse(data));
		}

		return result.success;
	};

	dataStore.subscribe((v) => {
		currentData = v;
		errorsStore.set(getNullableInstanse(v));
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
			set: errorsStore.set
		},
		zod: {
			subscribe: zodError.subscribe,
		},
		validate,
	};
};
