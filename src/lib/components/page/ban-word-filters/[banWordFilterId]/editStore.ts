import type { BanWordFilter } from '$lib/service/ban-word-filters.service';
import { writable } from 'svelte/store';

export type BanWordFilterEditStore = {
	banWordFilter: BanWordFilter;
	banWords: { id: string; show: boolean; word: string }[];
	isNameChanged: boolean;
	isBanWordsChanged: boolean;
};

export const formatBanWords = (banWords: { id: string; word: string }[]) =>
	Array.from(new Set(banWords.map((v) => v.word.toLowerCase().trim()).filter((v) => v)));

export const createBanWordFilterEdit = (banWordFilter: BanWordFilter, banWords: string[]) => {
	const previousBanWordFilter = structuredClone(banWordFilter);
	const previousBanWords = banWords;
	const { set, subscribe, update } = writable({
		banWordFilter,
		banWords: banWords.map((word) => ({
			id: (Math.random() + 1).toString(36).substring(2),
			show: false,
			word,
		})),
		isAllVisible: false,
		isNameChanged: false,
		isBanWordsChanged: false,
	});

	subscribe((v) => {
		const isNameChanged = v.banWordFilter.name !== previousBanWordFilter.name;
		const newBanWords = formatBanWords(v.banWords);
		const notHavePreviousBanWords = previousBanWords.some((word) => !newBanWords.includes(word));
		const haveNewBanWords = newBanWords.some((word) => !previousBanWords.includes(word));
		const isBanWordsChanged = notHavePreviousBanWords || haveNewBanWords;
		const isAllVisible = v.banWords.every((v) => v.show);
		if (
			v.isNameChanged !== isNameChanged ||
			v.isBanWordsChanged !== isBanWordsChanged ||
			v.isAllVisible !== isAllVisible
		) {
			update((v) => ({ ...v, isNameChanged, isBanWordsChanged, isAllVisible }));
		}
	});

	return {
		subscribe,
		set,
		update,
		addNewBanWord(word: string) {
			update((v) => ({
				...v,
				banWords: [
					...v.banWords,
					{
						id: (Math.random() + 1).toString(36).substring(2),
						show: v.isAllVisible,
						word,
					},
				],
			}));
		},
		removeBanWord(id: string) {
			update((v) => ({
				...v,
				banWords: v.banWords.filter((v) => v.id !== id),
			}));
		},
		toggleAll() {
			update((v) => ({
				...v,
				banWords: v.banWords.map((w) => ({ ...w, show: !v.isAllVisible })),
			}));
		},
	};
};
