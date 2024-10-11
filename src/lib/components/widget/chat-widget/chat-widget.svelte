<script lang="ts" context="module">
	import ChatContainer from '$lib/components/widget/chat-widget/chat-container.svelte';
	import {
		chatStoreContextKey,
		createChatStore,
	} from '$lib/components/widget/chat-widget/chat-store';
	import type { ChatSettings } from '$lib/types/api/entity/chat-settings';
	import type { TwitchBadge } from '$lib/types/api/entity/twitch-badge';
	import type { TwitchUserInfo } from '$lib/types/api/entity/twitch-user-info';
	import { type Emote } from '$lib/utils/emote';
	import { hash } from '$lib/utils/hash';
	import emojiRegex from 'emoji-regex';
	import { onMount, setContext } from 'svelte';
	import { Client } from 'tmi.js';
</script>

<script lang="ts">
	export let userInfo: TwitchUserInfo;
	export let chatSettings: ChatSettings;
	export let emotes: Emote[];
	export let badges: TwitchBadge[];
	export let banWords: string[];
	export let error: string | null;

	const chatStore = createChatStore({
		userInfo,
		settings: chatSettings,
		emotes,
		badges,
		banWords,
		messages: [],
	});

	const client = new Client({
		channels: [userInfo.login],
	});

	setContext(chatStoreContextKey, chatStore);

	onMount(() => {
		client.connect().catch((e) => (error = (e as Error).message));

		client.on('message', (_, tags, message, self) => {
			if (self) return;
			if (!tags['display-name']) return;
			if ('custom-reward-id' in tags && $chatStore.settings.hide.hidePointRewards) return;
			const badges: TwitchBadge[] = [];
			if (tags.badges) {
				Object.keys(tags.badges).forEach((set) => {
					const id = tags.badges![set];
					if (!$chatStore.badges) return;
					const badge = $chatStore.badges.find((v) => v.id === id && v.set === set);
					if (!badge) return;
					badges.push(badge);
				});
			}

			if (tags.emotes) {
				const emoteIds = Object.keys(tags.emotes);
				emoteIds.forEach((id) => {
					const emoteRange = tags.emotes![id][0];
					if (!emoteRange) return;
					const start = Number.parseInt(emoteRange.split('-')[0]);
					const end = Number.parseInt(emoteRange.split('-')[1]);
					if (Number.isNaN(start) || Number.isNaN(end)) return;
					const name = message.substring(start, end + 1)
					chatStore.addTwitchEmote(id, name);
				})
			}

			const messageWithEmojis = message.replaceAll(emojiRegex(), (match) => {
				const codePoint = match.codePointAt(0)
				if (!codePoint) return match;
				chatStore.addEmoji(codePoint.toString(16), match);
				return ` ${match} `
			})

			chatStore.addMessage({
				id: tags.id || hash(),
				timestamp: Date.now(),
				color: tags.color || null,
				nickname: tags['display-name'],
				badges,
				text: messageWithEmojis,
			});
		});

		client.on('messagedeleted', (_, _1, _2, tags) => {
			if (!tags['target-msg-id']) return;
			chatStore.removeMessage(tags['target-msg-id']);
		});

		client.on('ban', (_, username) => {
			chatStore.removeMessagesOfUser(username);
		});

		client.on('timeout', (_, username) => {
			chatStore.removeMessagesOfUser(username);
		});

		client.on('clearchat', () => {
			chatStore.clear();
		});
	});
</script>

<div class="fixed top-0 left-0 bottom-0 right-0 overflow-hidden grid">
	{#if $chatStore.messages.length > 0}
		<ChatContainer settings={$chatStore.settings} />
	{/if}
</div>
