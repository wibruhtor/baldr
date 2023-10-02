<script lang="ts" context="module">
	import type { ChatSettings } from '$lib/types/api/entity/chat-settings';
	import type { TwitchUserInfo } from '$lib/types/api/entity/twitch-user-info';
	import type { Emote } from '$lib/types/emote';
	import ChatContainer from '$lib/components/widget/chat-widget/chat-container.svelte';
	import { hash } from '$lib/utils/hash';
	import { onMount, setContext } from 'svelte';
	import {
		chatStoreContextKey,
		createChatStore,
	} from '$lib/components/widget/chat-widget/chat-store';
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

	setContext(chatStoreContextKey, chatStore);

	onMount(() => {
		chatStore.addMessage({
			id: hash(),
			timestamp: Date.now(),
			badges: [],
			nickname: 'BruhaBruh',
			color: '#527cd1',
			text: 'Привет <3',
		});
		chatStore.addMessage({
			id: hash(),
			timestamp: Date.now(),
			badges: [],
			nickname: 'Toolki1',
			color: '#CC001B',
			text: 'Ого Pog KEKW :)',
		});
		chatStore.addMessage({
			id: hash(),
			timestamp: Date.now(),
			badges: [],
			nickname: 'Rikonyameow',
			color: '#7B47FF',
			text: 'Кусь',
		});
		chatStore.addMessage({
			id: hash(),
			timestamp: Date.now(),
			badges: [],
			nickname: 'BruhaBruh',
			color: null,
			text: 'Что делаешь?',
		});
		chatStore.addMessage({
			id: hash(),
			timestamp: Date.now(),
			badges: [],
			nickname: 'nightbot',
			color: '#664ec7',
			text: 'Какая-то хрень',
		});
		chatStore.addMessage({
			id: hash(),
			timestamp: Date.now(),
			badges: [],
			nickname: 'BruhaBruh',
			color: '#664ec7',
			text: '!команда',
		});
		chatStore.addMessage({
			id: hash(),
			timestamp: Date.now(),
			badges: [],
			nickname: 'BruhaBruh',
			color: '#386FA4',
			text: 'А я приготовил славный о:м\\Л%е т в testовом соусе из qwertyлов',
		});
	});
</script>

{#if isLoading}
	Loading...
{:else}
	<ChatContainer settings={$chatStore.settings} />
{/if}
