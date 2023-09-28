import type { AllSessionsResponse, DeleteAllSessionsExcludeCurrentResponse, DeleteSessionResponse } from '$lib/types/api/response/sessions';
import { wetch } from '$lib/utils/wetch';

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
