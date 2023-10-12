import type { ChatSettings, ChatSettingsInfo } from '$lib/types/api/entity/chat-settings';

export type GetAllChatSettingsResponse = {
	chatSettings: ChatSettingsInfo[];
};

export type CreateChatSettingsResponse = ChatSettings;

export type GetChatSettingsResponse = ChatSettings;

export type UpdateChatSettingsResponse = ChatSettings;

export type DeleteChatSettingsResponse = true;
