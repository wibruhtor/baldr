import type {
	CreateChatSettingsRequest,
	UpdateChatSettingsRequest,
} from '$lib/types/api/request/chat-settings';
import type { UpdateBanWordFilterResponse } from '$lib/types/api/response/ban-word-filters';
import type {
	CreateChatSettingsResponse,
	DeleteChatSettingsResponse,
	GetAllChatSettingsInfoResponse,
	GetAllChatSettingsResponse,
	GetChatSettingsResponse,
} from '$lib/types/api/response/chat-settings';
import { wetch } from '$lib/utils/wetch';

class ChatSettingsService {
	async getAllChatSettings(accessToken: string): Promise<GetAllChatSettingsResponse> {
		return wetch<GetAllChatSettingsResponse>('/v1/chat-settings', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}

	async getAllChatSettingsInfo(accessToken: string): Promise<GetAllChatSettingsInfoResponse> {
		return wetch<GetAllChatSettingsInfoResponse>('/v1/chat-settings/info', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}

	async createChatSettings(
		req: CreateChatSettingsRequest,
		accessToken: string,
	): Promise<CreateChatSettingsResponse> {
		return wetch<CreateChatSettingsResponse>('/v1/chat-settings', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(req),
		});
	}

	async getChatSettings(id: string): Promise<GetChatSettingsResponse> {
		return wetch<GetChatSettingsResponse>('/v1/chat-settings/' + id);
	}

	async updateChatSettings(
		id: string,
		req: UpdateChatSettingsRequest,
		accessToken: string,
	): Promise<UpdateBanWordFilterResponse> {
		return wetch<UpdateBanWordFilterResponse>('/v1/chat-settings/' + id, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(req),
		});
	}

	async deleteBanWordFilter(id: string, accessToken: string): Promise<DeleteChatSettingsResponse> {
		return wetch<DeleteChatSettingsResponse>('/v1/chat-settings/' + id, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}
}

export const chatSettingsService = new ChatSettingsService();