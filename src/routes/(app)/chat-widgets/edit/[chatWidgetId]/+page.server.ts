import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { chatSettingsService } from '$lib/service/chat-settings.service';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const accessToken = cookies.get('at');

	if (!accessToken) throw redirect(307, '/');

	try {
		const chatSettings = await chatSettingsService.getChatSettings(params.chatWidgetId);
		return { chatSettings };
	} catch {
		throw error(404, { message: 'Not Found' });
	}
};
