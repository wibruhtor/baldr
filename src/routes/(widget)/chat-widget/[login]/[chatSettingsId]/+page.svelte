<script lang="ts" context="module">
	import type { Emote } from '$lib/types/emote';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { emoteFetcher } from '$lib/utils/emote-fetcher';
	import ChatWidget from '$lib/components/widget/chat-widget/chat-widget.svelte';
</script>

<script lang="ts">
	export let data: PageData;
	export let emotes: Emote[];

	onMount(() => {
		emoteFetcher
			.fetch(data.userInfo.id)
			.then((v) => (emotes = v))
			.catch(console.error);
	});
</script>

<ChatWidget
	chatSettings={data.chatSettings}
	userInfo={data.userInfo}
	banWords={data.banWords}
	{emotes}
/>
