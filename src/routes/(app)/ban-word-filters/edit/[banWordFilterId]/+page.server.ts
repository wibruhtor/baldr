import { banWordFiltersService } from '$lib/service/ban-word-filters.service';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const accessToken = cookies.get('at');

	if (!accessToken) throw error(404, { message: 'Not Found' });

	try {
		const data = await banWordFiltersService.getBanWordFilter(params.banWordFilterId, accessToken);
		return { banWordFilter: data.filter, banWords: data.banWords };
	} catch {
		throw error(404, { message: 'Not Found' });
	}
};
