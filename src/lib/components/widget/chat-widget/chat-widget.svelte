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
</script>

<script lang="ts">
	export let userInfo: TwitchUserInfo;
	export let chatSettings: ChatSettings;
	export let emotes: Emote[];
	export let banWords: string[];
	export let isLoading: boolean;

	const chatStore = createChatStore({
		userInfo,
		settings: chatSettings,
		emotes,
		banWords,
		messages: [],
	});

	const client = new Client({
		channels: [userInfo.login],
	});

	setContext(chatStoreContextKey, chatStore);

	onMount(() => {
		client.connect().catch(console.error);

		client.on('message', (_, tags, message, self) => {
			if (self) return;
			if (!tags['display-name']) return;
			if ('custom-reward-id' in tags && $chatStore.settings.hide.hidePointRewards) return;
			chatStore.addMessage({
				id: tags.id || hash(),
				timestamp: Date.now(),
				color: tags.color || null,
				nickname: tags['display-name'],
				badges: [],
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

{#if isLoading}
	Loading...
{:else}
	<ChatContainer settings={$chatStore.settings} />
{/if}
