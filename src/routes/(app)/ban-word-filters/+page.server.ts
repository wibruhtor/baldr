import { banWordFiltersService } from '$lib/service/ban-word-filters.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const accessToken = cookies.get('at');

	if (!accessToken) return { banWordFilters: [] };

	try {
		const { filters } = await banWordFiltersService.getAllBanWordFilters(accessToken);
		return { banWordFilters: filters };
	} catch {
		return { banWordFilters: [] };
	}
};
