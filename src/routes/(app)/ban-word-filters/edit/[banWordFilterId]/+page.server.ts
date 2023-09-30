import { banWordFiltersService } from '$lib/service/ban-word-filters.service';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const accessToken = cookies.get('at');

	if (!accessToken) throw redirect(307, '/');

	try {
		const data = await banWordFiltersService.getBanWordFilter(params.banWordFilterId, accessToken);
		return { banWordFilter: data.filter, banWords: data.banWords };
	} catch {
		throw error(404, { message: 'Not Found' });
	}
};
