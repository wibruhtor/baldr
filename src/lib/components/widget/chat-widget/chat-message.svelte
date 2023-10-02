<script lang="ts" context="module">
	import type { ChatSettings } from '$lib/types/api/entity/chat-settings';
	import type { ChatMessage } from '$lib/types/chat/chat-message';
	import Nickname from '$lib/components/widget/chat-widget/nickname.svelte';
	import Text from '$lib/components/widget/chat-widget/text.svelte';
</script>

<script lang="ts">
	export let chatMessage: ChatMessage;
	export let settings: ChatSettings;
</script>

<p>
	<Nickname {settings} nickname={chatMessage.nickname} color={chatMessage.color} /><Text
		text={chatMessage.text}
	/>
</p>
