<script lang="ts" context="module">
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
</script>

<article class="grid grid-cols-1 gap-4">
	<h2 class="typography-h3">Виджеты</h2>
	<div class="grid grid-cols-4 gap-4">
		<a href="/chat-widgets">
			<Card class="hover:bg-card-foreground/5">
				<CardHeader class="py-16">
					<CardTitle class="flex justify-center">Чат</CardTitle>
				</CardHeader>
			</Card>
		</a>
	</div>
</article>
