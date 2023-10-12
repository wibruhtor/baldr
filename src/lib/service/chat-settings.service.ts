import type {
	CreateChatSettingsRequest,
	UpdateChatSettingsRequest,
} from '$lib/types/api/request/chat-settings';
import type {
	CreateChatSettingsResponse,
	DeleteChatSettingsResponse,
	GetAllChatSettingsResponse,
	GetChatSettingsResponse,
	UpdateChatSettingsResponse,
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
	): Promise<UpdateChatSettingsResponse> {
		return wetch<UpdateChatSettingsResponse>('/v1/chat-settings/' + id, {
			method: 'PUT',
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
