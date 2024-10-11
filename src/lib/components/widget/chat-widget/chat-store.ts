import type { ChatSettings } from '$lib/types/api/entity/chat-settings';
import type { TwitchBadge } from '$lib/types/api/entity/twitch-badge';
import type { TwitchUserInfo } from '$lib/types/api/entity/twitch-user-info';
import type { ChatMessage } from '$lib/types/chat/chat-message';
import { banWordReplacer } from '$lib/utils/ban-word-replacer';
import { EmojiEmote, TwitchEmote, type Emote } from '$lib/utils/emote';
import { emoteReplacer } from '$lib/utils/emote-replacer';
import { linkReplacer } from '$lib/utils/link-replacer';
import { writable } from 'svelte/store';

export const chatStoreContextKey = 'chat-widget-store';

export type ChatStore = {
	userInfo: TwitchUserInfo;
	settings: ChatSettings;
	emotes: Emote[];
	badges: TwitchBadge[];
	messages: ChatMessage[];
	banWords: string[];
};

export type WritableChatStore = ReturnType<typeof createChatStore>;

export const createChatStore = (initialState: ChatStore) => {
	const { subscribe, update } = writable(initialState);

	return {
		subscribe,
		addMessage(message: ChatMessage) {
			update((v) => {
				if (message.text.startsWith(v.settings.hide.hideMessagePattern)) return v;
				if (
					v.settings.hide.nicknames
						.map((v) => v.toLowerCase())
						.includes(message.nickname.toLowerCase())
				)
					return v;

				let text = message.text;
				if (v.banWords.length > 0) {
					text = banWordReplacer.replace(
						message.text,
						v.settings.hide.banWordReplacement,
						v.banWords,
					);
				}
				if (v.settings.hide.hideLinks) {
					text = linkReplacer.replace(text, v.settings.hide.linkReplacement);
				}
				const withEmotes = emoteReplacer.replace(text, v.emotes)

				text = withEmotes.flatMap((v) => {
					if (v.startsWith('<img'))
						return [v]
					return [' ', v]
				}).join('').trim();

				if (text.length === 0) return v;
				message.text = text;

				let messages = [...v.messages, message];
				messages.sort((a, b) => b.timestamp - a.timestamp);
				messages = messages.slice(0, v.settings?.size.maxMessages || 50);

				return { ...v, messages };
			});
		},
		removeMessage(id: string) {
			update((v) => ({ ...v, messages: v.messages.filter((m) => m.id !== id) }));
		},
		removeMessagesOfUser(nickname: string) {
			update((v) => ({ ...v, messages: v.messages.filter((m) => m.nickname !== nickname) }));
		},
		clear() {
			update((v) => ({ ...v, messages: [] }));
		},
		addTwitchEmote(id: string, name: string) {
			update(v => {
				if (v.emotes.some(e => e.name === name)) return v;
				return {
					...v,
					emotes: [...v.emotes, new TwitchEmote('__runtime', id, name)]
				}
			})
		},
		addEmoji(code: string, emoji: string) {
			update(v => {
				if (v.emotes.some(e => e.name === emoji)) return v;
				return {
					...v,
					emotes: [...v.emotes, new EmojiEmote(code, emoji)]
				}
			})
		}
	};
};
