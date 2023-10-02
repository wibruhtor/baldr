<script lang="ts" context="module">
	import type { ChatSettings } from '$lib/types/api/entity/chat-settings';
	import type { TwitchUserInfo } from '$lib/types/api/entity/twitch-user-info';
	import type { Emote } from '$lib/types/emote';
	import ChatContainer from '$lib/components/widget/chat-widget/chat-container.svelte';
	import { hash } from '$lib/utils/hash';
	import { chatStore } from '$lib/components/widget/chat-widget/chat-store';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	export let userInfo: TwitchUserInfo;
	export let chatSettings: ChatSettings;
	export let emotes: Emote[];
	export let banWords: string[];

	$: chatStore.setUserInfo(userInfo);
	$: chatStore.setChatSettings(chatSettings);
	$: chatStore.setEmotes(emotes);
	$: chatStore.setBanWords(banWords);

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
	});
</script>

{#if $chatStore.userInfo !== null && $chatStore.settings !== null}
	<ChatContainer />
{:else}
	Loading...
{/if}
