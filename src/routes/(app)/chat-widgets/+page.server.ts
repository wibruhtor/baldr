import { chatSettingsService } from '$lib/service/chat-settings.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const accessToken = cookies.get('at');

	if (!accessToken) return { chatSettingsInfo: [] };

	try {
		const { chatSettingsInfo } = await chatSettingsService.getAllChatSettingsInfo(accessToken);
		return { chatSettingsInfo };
	} catch {
		return { chatSettingsInfo: [] };
	}
};
