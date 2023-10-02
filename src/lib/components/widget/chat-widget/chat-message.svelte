<script lang="ts" context="module">
	import { chatStore } from '$lib/components/widget/chat-widget/chat-store';
	import type { ChatSettings } from '$lib/types/api/entity/chat-settings';
	import type { ChatMessage } from '$lib/types/chat/chat-message';
	import Nickname from '$lib/components/widget/chat-widget/nickname.svelte';
</script>

<script lang="ts">
	import Text from '$lib/components/widget/chat-widget/text.svelte';

	export let chatMessage: ChatMessage;
</script>

<p>
	<Nickname nickname={chatMessage.nickname} color={chatMessage.color} /><Text
		text={chatMessage.text}
	/>
</p>
