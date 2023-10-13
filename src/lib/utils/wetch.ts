import { browser } from '$app/environment';
import { AppError } from '$lib/utils/app-error';
import { PUBLIC_API_ORIGIN, PUBLIC_SERVER_ORIGIN } from '$env/static/public';

const apiOrigin = browser ? PUBLIC_API_ORIGIN : PUBLIC_SERVER_ORIGIN;

export const wetch = async <T = void>(
	path: string,
	init?: RequestInit,
	origin: string = apiOrigin,
): Promise<T> => {
	const r = await fetch(`${origin}${path}`, {
		mode: 'cors',
		...init,
	});
	if (r.status === 204) {
		return true as T;
	}
	const traceId = r.headers.get('traceparent') || undefined;
	try {
		const json = await r.json();
		if (r.ok) {
			return json;
		}
		throw new AppError(r.status, json.message || null, traceId, json.other || {});
	} catch (e) {
		if (e instanceof AppError) {
			throw e;
		}
		throw new AppError(r.status, 'message is not json', traceId);
	}
};
