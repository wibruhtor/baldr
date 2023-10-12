import type { BanWordFilter } from '$lib/types/api/entity/ban-word-filter';

export type GetAllBanWordFiltersResponse = {
	banWordFilters: BanWordFilter[];
};

export type CreateBanWordFilterResponse = BanWordFilter;

export type GetBanWordFilterResponse = BanWordFilter;

export type UpdateBanWordFilterResponse = BanWordFilter;

export type DeleteBanWordFilterResponse = true;
