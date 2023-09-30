import { chatSettingsService } from '$lib/service/chat-settings.service';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const accessToken = cookies.get('at');

	if (!accessToken) throw redirect(307, '/');

	try {
		const { chatSettingsInfo } = await chatSettingsService.getAllChatSettingsInfo(accessToken);
		return { chatSettingsInfo };
	} catch {
		return { chatSettingsInfo: [] };
	}
};
