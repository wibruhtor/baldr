import { banWordFiltersService } from '$lib/service/ban-word-filters.service';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const accessToken = cookies.get('at');

	if (!accessToken) throw redirect(307, '/');

	try {
		const { banWordFilters } = await banWordFiltersService.getAllBanWordFilters(accessToken);
		return { banWordFilters };
	} catch {
		return { banWordFilters: [] };
	}
};
