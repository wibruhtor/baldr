<script lang="ts" context="module">
	import {
		chatStoreContextKey,
		type WritableChatStore,
	} from '$lib/components/widget/chat-widget/chat-store';
	import { getContext } from 'svelte';
</script>

<script lang="ts">
	export let text: string;

	const chatStore = getContext<WritableChatStore>(chatStoreContextKey);

	$: showSeparator =
		$chatStore.settings.chatType !== 'alternative-block' &&
		$chatStore.settings.chatType !== 'alternative-block-reverse';

	$: separtor = showSeparator ? ': ' : '';
</script>

<span style="overflow: hidden">{separtor}{@html text}</span>

<style lang="postcss">
	:global(.emote) {
		display: inline-block;
		height: 1.5em;
		vertical-align: bottom;
		margin-right: 0.1em;
	}
</style>
