import { protectedRouteIds } from '$lib/utils/protectionRoutes';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const theme = event.cookies.get('theme') || 'system';

	if (!event.cookies.get('at')) {
		for (const i in protectedRouteIds) {
			const r = protectedRouteIds[i];
			if (event.route?.id?.startsWith(r)) {
				throw redirect(307, '/');
			}
		}
	}

	return await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%baldr.theme%', theme),
	});
};
