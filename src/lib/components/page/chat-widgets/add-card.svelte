<script lang="ts" context="module">
	import { Plus } from 'lucide-svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
</script>

<a href="/chat-widgets/create" class="grid grid-cols-1">
	<Card class="hover:bg-card-foreground/5 flex items-center cursor-pointer">
		<CardHeader class="py-12 w-full">
			<CardTitle class="flex justify-center"><Plus class="h-10 w-10" /></CardTitle>
		</CardHeader>
	</Card>
</a>
