import type { BanWordFilter } from '$lib/types/api/entity/ban-word-filter';

export type GetAllBanWordFiltersResponse = {
	filters: BanWordFilter[];
};

export type CreateBanWordFilterResponse = BanWordFilter;

export type GetBanWordFilterResponse = {
	filter: BanWordFilter;
	banWords: string[];
};

export type UpdateBanWordFilterResponse = BanWordFilter;

export type DeleteBanWordFilterResponse = true;

export type GetBanWordsOfFilterResponse = {
	banWords: string[];
};
export type UpdateBanWordsOfFilterResponse = true;
