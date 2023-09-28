import type { Session } from '$lib/types/api/entity/session';
import { wetch } from '$lib/utils/wetch';

export type AllSessionsResponse = { sessions: Session[] };
export type DeleteSessionResponse = true;
export type DeleteAllSessionsExcludeCurrentResponse = true;

class SessionsService {
	async getAllSesssions(accessToken: string): Promise<AllSessionsResponse> {
		return wetch<AllSessionsResponse>('/auth/sessions', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}

	async deleteSession(id: string, accessToken: string): Promise<DeleteSessionResponse> {
		return wetch<DeleteSessionResponse>('/auth/sessions/' + id, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}

	async deleteAllExcludeCurrent(
		accessToken: string,
	): Promise<DeleteAllSessionsExcludeCurrentResponse> {
		return wetch<DeleteAllSessionsExcludeCurrentResponse>('/auth/sessions', {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}
}

export const sessionsService = new SessionsService();
