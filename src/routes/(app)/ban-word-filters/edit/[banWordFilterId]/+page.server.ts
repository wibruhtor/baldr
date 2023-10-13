import { banWordFiltersService } from '$lib/service/ban-word-filters.service';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { AppError } from '$lib/utils/app-error';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const accessToken = cookies.get('at');

	if (!accessToken) throw redirect(307, '/');

	try {
		const banWordFilter = await banWordFiltersService.getBanWordFilter(params.banWordFilterId);
		return { banWordFilter };
	} catch (e) {
		if (e instanceof AppError) {
			throw error(404, { message: 'Not Found', traceId: e.getTraceId() });
		}
		throw error(404, { message: 'Not Found' });
	}
};
