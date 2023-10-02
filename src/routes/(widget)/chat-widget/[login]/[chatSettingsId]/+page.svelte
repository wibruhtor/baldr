<script lang="ts" context="module">
	import type { Emote } from '$lib/types/emote';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { emoteFetcher } from '$lib/utils/emote-fetcher';
	import ChatWidget from '$lib/components/widget/chat-widget/chat-widget.svelte';
</script>

<script lang="ts">
	export let data: PageData;
	let emotes: Emote[];
	let isLoading = true;

	onMount(() => {
		emoteFetcher
			.fetch(data.userInfo.id)
			.then((v) => {
				emotes = v;
				isLoading = false;
			})
			.catch((e) => {
				console.error(e);
				isLoading = false;
			});
	});
</script>

{#key isLoading || emotes || data.banWords}
	<ChatWidget
		chatSettings={data.chatSettings}
		userInfo={data.userInfo}
		banWords={data.banWords}
		{emotes}
		{isLoading}
	/>
{/key}
