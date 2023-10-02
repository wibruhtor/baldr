<script lang="ts" context="module">
	import type { Emote } from '$lib/types/emote';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { emoteFetcher } from '$lib/utils/emote-fetcher';
</script>

<script lang="ts">
	export let data: PageData;

	let emotes: Emote[] = [];

	onMount(() => {
		emoteFetcher
			.fetch(data.userInfo.id)
			.then((r) => (emotes = r))
			.catch(console.error);
	});
</script>

<pre>
	{JSON.stringify({ userInfo: data.userInfo, chatSettings: data.chatSettings, emotes }, null, 2)}
</pre>
