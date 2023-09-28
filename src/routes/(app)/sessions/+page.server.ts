import { sessionsService } from '$lib/service/sessions.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const accessToken = cookies.get('at');

	if (!accessToken) return { sessions: [] };

	try {
		const { sessions } = await sessionsService.getAllSesssions(accessToken);
		return { sessions };
	} catch {
		return { sessions: [] };
	}
};
