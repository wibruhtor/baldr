import { wetch } from '$lib/utils/wetch';

export type BanWordFilter = {
	id: string;
	name: string;
	userId: string;
};
export type GetAllBanWordFiltersResponse = {
	filters: BanWordFilter[];
};
export type CreateBanWordFilterRequest = {
	name: string;
};
export type CreateBanWordFilterResponse = BanWordFilter;
export type GetBanWordFilterResponse = {
	filter: BanWordFilter;
	banWords: string[];
};
export type UpdateBanWordFilterRequest = {
	name: string;
};
export type UpdateBanWordFilterResponse = BanWordFilter;
export type DeleteBanWordFilterResponse = true;
export type GetBanWordsOfFilterResponse = {
	banWords: string[];
};
export type UpdateBanWordsOfFilterRequest = {
	banWords: string[];
};
export type UpdateBanWordsOfFilterResponse = true;

class BanWordFiltersService {
	async getAllBanWordFilters(accessToken: string): Promise<GetAllBanWordFiltersResponse> {
		return wetch<GetAllBanWordFiltersResponse>('/v1/ban-word-filters', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}

	async createBanWordFilter(
		req: CreateBanWordFilterRequest,
		accessToken: string,
	): Promise<CreateBanWordFilterResponse> {
		return wetch<CreateBanWordFilterResponse>('/v1/ban-word-filters', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(req),
		});
	}

	async getBanWordFilter(id: string, accessToken: string): Promise<GetBanWordFilterResponse> {
		return wetch<GetBanWordFilterResponse>('/v1/ban-word-filters/' + id, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}

	async updateBanWordFilter(
		id: string,
		req: UpdateBanWordFilterRequest,
		accessToken: string,
	): Promise<UpdateBanWordFilterResponse> {
		return wetch<UpdateBanWordFilterResponse>('/v1/ban-word-filters/' + id, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(req),
		});
	}

	async deleteBanWordFilter(id: string, accessToken: string): Promise<DeleteBanWordFilterResponse> {
		return wetch<DeleteBanWordFilterResponse>('/v1/ban-word-filters/' + id, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}

	async getBanWordsOfFilter(id: string): Promise<GetBanWordsOfFilterResponse> {
		return wetch<GetBanWordsOfFilterResponse>('/v1/ban-word-filters/' + id + '/ban-words');
	}

	async updateBanWordsOfFilter(
		id: string,
		req: UpdateBanWordsOfFilterRequest,
		accessToken: string,
	): Promise<UpdateBanWordsOfFilterResponse> {
		return wetch<UpdateBanWordsOfFilterResponse>('/v1/ban-word-filters/' + id + '/ban-words', {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(req),
		});
	}
}

export const banWordFiltersService = new BanWordFiltersService();
