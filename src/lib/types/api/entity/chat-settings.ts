export type ChatSettingsInfo = {
	id: string;
	name: string;
	chatType: ChatType;
	userId: string;
};

export type ChatSettings = {
	id: string;
	name: string;
	chatType: ChatType;
	color: ChatColorSettings;
	size: ChatSizeSettings;
	hide: ChatHideSettings;
	font: ChatFontSettings;
	userId: string;
};

export type ChatType = 'default' | 'default-reverse' | 'block' | 'block-reverse' | 'alternative-block' | 'alternative-block-reverse';

export type ChatColorSettings = {
	nicknameColor: number;
	backgroundColor: number;
	textColor: number;
	gradientOnlyForCustomNicknames: boolean;
	customNicknames: ChatCustomNickname[];
};

export type ChatCustomNickname = {
	nickname: string;
	startColor: number;
	endColor: number;
};

export type ChatSizeSettings = {
	marginTop: number;
	marginRight: number;
	marginBottom: number;
	marginLeft: number;
	paddingTop: number;
	paddingRight: number;
	paddingBottom: number;
	paddingLeft: number;
	borderTopLeftRadius: number;
	borderTopRightRadius: number;
	borderBottomLeftRadius: number;
	borderBottomRightRadius: number;
	maxMessages: number;
};

export type ChatHideSettings = {
	hideMessagePattern: string;
	hidePointRewards: boolean;
	hideLinks: boolean;
	linkReplacement: string;
	banWordReplacement: string;
	nicknames: string[];
	banWordFilterId: string | null;
};

export type ChatFontSettings = {
	fontFamily: string;
	nicknameFontWeight: number;
	textFontWeight: number;
	fontSize: number;
};
