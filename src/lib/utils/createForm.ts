import { writable } from 'svelte/store';
import type { ParseParams, ZodError } from 'zod';

type ErrorMessage = string | null;

type ErrorRecordBasic = Record<string, unknown>;
type ErrorRecord = Record<string, unknown | Errors<ErrorRecordBasic>[]>;

export type Errors<T extends ErrorRecord> = {
	[Key in keyof T]: T[Key] extends ErrorRecord
		? Errors<T[Key]>
		: T[Key] extends ErrorRecord[]
		? ErrorsArray<T[Key]>
		: ErrorMessage;
};

export type ErrorsArray<T extends ErrorRecord[]> = {
	[Key in keyof T]: T[Key] extends Record<string, unknown> ? Errors<T[Key]> : ErrorMessage;
};

type NullableRecord = Record<string, null>;
type NestedNullableRecord = Record<string, null | NullableRecord[]>;

const getNullableObject = (data: NestedNullableRecord): NestedNullableRecord => {
	const object: NestedNullableRecord = {};

	Object.keys(data).forEach((key) => {
		if (Array.isArray(data[key])) {
			object[key] = (data[key] as unknown[]).map((_, i) =>
				getNullableObject((data[key] as unknown[])[i] as NullableRecord),
			) as NullableRecord[];
		} else {
			object[key] = null;
		}
	});

	return object;
};

const getNullErrors = <Data extends Record<string, unknown>>(data: Data): Errors<Data> => {
	return getNullableObject(data as NestedNullableRecord) as Errors<Data>;
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
	const zodError = writable<ZodError<Data> | null>(null);

	let currentData = data;
	let currentErrors = getNullErrors(data);

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
			errorsStore.set(getNullErrors(data));
		}

		return result.success;
	};

	dataStore.subscribe((v) => {
		currentData = v;
		errorsStore.set(getNullErrors(v))
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
		zod: {
			subscribe: zodError.subscribe,
		},
		validate,
	};
};
