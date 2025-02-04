import { sessionsService } from '$lib/service/sessions.service';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const accessToken = cookies.get('at');

	if (!accessToken) throw redirect(307, '/');

	try {
		const { sessions } = await sessionsService.getAllSesssions(accessToken);
		return { sessions };
	} catch {
		return { sessions: [] };
	}
};
