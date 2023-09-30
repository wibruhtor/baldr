<script lang="ts" context="module">
	import type { ChatSettingsInfo } from '$lib/types/api/entity/chat-settings';
	import AddCard from '$lib/components/page/chat-widgets/add-card.svelte';
</script>

<script lang="ts">
	import ChatWidgetCard from '$lib/components/page/chat-widgets/chat-widget-card.svelte';

	export let chatSettingsInfo: ChatSettingsInfo[];
</script>

<article class="grid grid-cols-1 gap-4">
	<h2 class="typography-h3">Виджеты Чата</h2>
	<div class="grid grid-cols-3 gap-4">
		{#each chatSettingsInfo as info (info.id)}
			<ChatWidgetCard chatSettingsInfo={info} />
		{/each}
		<AddCard />
	</div>
</article>
