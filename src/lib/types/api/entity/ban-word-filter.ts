export type BanWordFilterInfo = {
	id: string;
	name: string;
	userId: string;
};

export type BanWordFilter = BanWordFilterInfo & {
	banWords: string[]
};
