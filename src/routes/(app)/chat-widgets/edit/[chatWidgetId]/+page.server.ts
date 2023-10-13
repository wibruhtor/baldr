import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { chatSettingsService } from '$lib/service/chat-settings.service';
import { AppError } from '$lib/utils/app-error';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const accessToken = cookies.get('at');

	if (!accessToken) throw redirect(307, '/');

	try {
		const chatSettings = await chatSettingsService.getChatSettings(params.chatWidgetId);
		return { chatSettings };
	} catch (e) {
		if (e instanceof AppError) {
			throw error(404, { message: 'Not Found', traceId: e.getTraceId() });
		}
		throw error(404, { message: 'Not Found' });
	}
};
