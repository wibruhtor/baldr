<script lang="ts" context="module">
	import type { Emote } from '$lib/types/emote';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { emoteFetcher } from '$lib/utils/emote-fetcher';
	import ChatWidget from '$lib/components/widget/chat-widget/chat-widget.svelte';
	import type { TwitchBadge } from '$lib/types/api/entity/twitch-badge';
	import { badgeFetcher } from '$lib/utils/badge-fetcher';
</script>

<script lang="ts">
	export let data: PageData;
	let emotes: Emote[];
	let badges: TwitchBadge[];
	let isLoading = true;
	let error: string | null = null;

	onMount(async () => {
		const [emotesResult, badgesResult] = await Promise.allSettled([
			emoteFetcher.fetch(data.userInfo.id),
			badgeFetcher.fetch(data.userInfo.id),
		]);

		if (emotesResult.status === 'fulfilled') {
			emotes = emotesResult.value;
		} else {
			console.error('fail fetch emotes', emotesResult.reason);
		}
		if (badgesResult.status === 'fulfilled') {
			badges = badgesResult.value;
		} else {
			console.error('fail fetch emotes', badgesResult.reason);
		}
		isLoading = false;
	});
</script>

{#if error}
	{error}
{:else if isLoading}
	Loading...
{:else}
	{#key isLoading || emotes || badges || data.banWords}
		<ChatWidget
			chatSettings={data.chatSettings}
			userInfo={data.userInfo}
			banWords={data.banWords}
			bind:error
			{emotes}
			{badges}
		/>
	{/key}
{/if}
