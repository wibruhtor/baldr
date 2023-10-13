import type { GetTwitchUserInfoResponse } from '$lib/types/api/response/twitch-user-info';
import { wetch } from '$lib/utils/wetch';

class TwitchService {
	async getUserInfo(login: string): Promise<GetTwitchUserInfoResponse> {
		return wetch<GetTwitchUserInfoResponse>('/v1/twitch/user/' + login + '/info');
	}
}

export const twitchService = new TwitchService();
