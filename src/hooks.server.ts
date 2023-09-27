import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const theme = event.cookies.get('theme') || 'system';

	return await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%baldr.theme%', theme),
	});
};
