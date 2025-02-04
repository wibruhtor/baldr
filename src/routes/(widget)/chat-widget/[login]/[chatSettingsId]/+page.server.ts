import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { twitchService } from '$lib/service/twitch.service';
import { chatSettingsService } from '$lib/service/chat-settings.service';
import type { TwitchUserInfo } from '$lib/types/api/entity/twitch-user-info';
import type { ChatSettings } from '$lib/types/api/entity/chat-settings';
import { banWordFiltersService } from '$lib/service/ban-word-filters.service';
import { AppError } from '$lib/utils/app-error';

export const load: PageServerLoad = async ({ params }) => {
	let userInfo: TwitchUserInfo;
	let chatSettings: ChatSettings;
	let banWords: string[] = [];
	try {
		userInfo = await twitchService.getUserInfo(params.login);
	} catch (e) {
		if (e instanceof AppError) {
			throw error(404, { message: 'fail get user info', traceId: e.getTraceId() });
		}
		throw error(404, { message: 'fail get user info' });
	}
	try {
		chatSettings = await chatSettingsService.getChatSettings(params.chatSettingsId);
	} catch (e) {
		if (e instanceof AppError) {
			throw error(404, { message: 'fail get chat settings', traceId: e.getTraceId() });
		}
		throw error(404, { message: 'fail get chat settings' });
	}
	try {
		if (chatSettings.hide.banWordFilterId) {
			banWords = (await banWordFiltersService.getBanWordFilter(chatSettings.hide.banWordFilterId))
				.banWords;
		}
	} catch (e) {
		if (e instanceof AppError) {
			throw error(404, { message: 'fail get ban words', traceId: e.getTraceId() });
		}
		throw error(404, { message: 'fail get ban words' });
	}
	return { userInfo, chatSettings, banWords };
};
