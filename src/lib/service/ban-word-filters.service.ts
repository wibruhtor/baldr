import type {
	CreateBanWordFilterRequest,
	UpdateBanWordFilterRequest,
} from '$lib/types/api/request/ban-word-filters';
import type {
	CreateBanWordFilterResponse,
	DeleteBanWordFilterResponse,
	GetAllBanWordFiltersResponse,
	GetBanWordFilterResponse,
	UpdateBanWordFilterResponse,
} from '$lib/types/api/response/ban-word-filters';
import { wetch } from '$lib/utils/wetch';

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

	async getBanWordFilter(id: string): Promise<GetBanWordFilterResponse> {
		return wetch<GetBanWordFilterResponse>('/v1/ban-word-filters/' + id);
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
}

export const banWordFiltersService = new BanWordFiltersService();
