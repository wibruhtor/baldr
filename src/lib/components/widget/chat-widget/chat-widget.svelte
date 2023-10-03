<script lang="ts" context="module">
	import type { ChatSettings } from '$lib/types/api/entity/chat-settings';
	import type { TwitchUserInfo } from '$lib/types/api/entity/twitch-user-info';
	import type { Emote } from '$lib/types/emote';
	import ChatContainer from '$lib/components/widget/chat-widget/chat-container.svelte';
	import { onMount, setContext } from 'svelte';
	import {
		chatStoreContextKey,
		createChatStore,
	} from '$lib/components/widget/chat-widget/chat-store';
	import { Client } from 'tmi.js';
	import { hash } from '$lib/utils/hash';
	import type { TwitchBadge } from '$lib/types/api/entity/twitch-badge';
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

			chatStore.addMessage({
				id: tags.id || hash(),
				timestamp: Date.now(),
				color: tags.color || null,
				nickname: tags['display-name'],
				badges,
				text: message,
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
