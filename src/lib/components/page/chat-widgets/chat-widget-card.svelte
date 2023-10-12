<script lang="ts" context="module">
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import type { ChatSettingsInfo } from '$lib/types/api/entity/chat-settings';
</script>

<script lang="ts">
	export let chatSettings: ChatSettingsInfo;
</script>

<a href={'/chat-widgets/edit/' + chatSettings.id}>
	<Card class="hover:bg-card-foreground/5">
		<CardHeader class="py-16">
			<CardTitle class="flex justify-center">{chatSettings.name}</CardTitle>
		</CardHeader>
	</Card>
</a>
