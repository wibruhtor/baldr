<script lang="ts">
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import type { BanWordFilter } from '$lib/service/ban-word-filters.service';

	export let banWordFilter: BanWordFilter;
</script>

<a href={'/ban-word-filters/' + banWordFilter.id}>
	<Card class="hover:bg-card-foreground/5">
		<CardHeader class="py-16">
			<CardTitle class="flex justify-center">{banWordFilter.name}</CardTitle>
		</CardHeader>
	</Card>
</a>
