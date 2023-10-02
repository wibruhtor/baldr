<script lang="ts" context="module">
	import { chatStore } from '$lib/components/widget/chat-widget/chat-store';
	import ChatMessage from '$lib/components/widget/chat-widget/chat-message.svelte';
</script>

<script lang="ts">
</script>

{#each $chatStore.messages as message (message.id)}
	<ChatMessage chatMessage={message} />
{/each}
