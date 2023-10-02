<script lang="ts" context="module">
	import {
		chatStoreContextKey,
		type WritableChatStore,
	} from '$lib/components/widget/chat-widget/chat-store';
	import ChatMessage from '$lib/components/widget/chat-widget/chat-message.svelte';
	import { getContext } from 'svelte';
</script>

<script lang="ts">
	const chatStore = getContext<WritableChatStore>(chatStoreContextKey);
</script>

{#each $chatStore.messages as message (message.id)}
	<ChatMessage chatMessage={message} settings={$chatStore.settings} />
{/each}
