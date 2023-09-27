import { AppError } from "$lib/utils/app-error";

const origin = typeof window === "undefined" ? 'http://localhost:8000' : 'http://api.wibruhtor.localhost'

export const wetch = async <T = void>(path: string, init?: RequestInit): Promise<T> => {
  const r = await fetch(`${origin}${path}`, {
    mode: 'cors',
    ...init,
  });
  if (r.status === 204) {
    return true as T;
  }
  const requestId = r.headers.get('Request-Id') || '';
  try {
    const json = await r.json();
    if (r.ok) {
      return json;
    }
    throw new AppError(r.status, json.message || null, requestId, json.other || {});
  } catch (e) {
    if (e instanceof AppError) {
      throw e;
    }
    throw new AppError(r.status, 'message is not json', requestId);
  }
};