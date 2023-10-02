import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { twitchService } from '$lib/service/twitch.service';
import { chatSettingsService } from '$lib/service/chat-settings.service';
import type { TwitchUserInfo } from '$lib/types/api/entity/twitch-user-info';
import type { ChatSettings } from '$lib/types/api/entity/chat-settings';

export const load: PageServerLoad = async ({ params }) => {
	let userInfo: TwitchUserInfo
	let chatSettings: ChatSettings
	try {
		userInfo = await twitchService.getUserInfo(params.login);
	} catch {
		throw error(404, { message: 'fail get user info' });
	}
	try {
		chatSettings = await chatSettingsService.getChatSettings(params.chatSettingsId)
	} catch {
		throw error(404, { message: 'fail get chat settings' });
	}
	return { userInfo, chatSettings }
};
