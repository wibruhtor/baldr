<script lang="ts">
	import AddCard from '$lib/components/page/ban-word-filters/add-card.svelte';
	import BanWordFilterCard from '$lib/components/page/ban-word-filters/ban-word-filter-card.svelte';
	import type { BanWordFilter } from '$lib/service/ban-word-filters.service';

	export let banWordFilters: BanWordFilter[];
</script>

<article class="grid grid-cols-1 gap-4">
	<h2 class="typography-h3">Бан Ворд Фильтры</h2>
	<div class="grid grid-cols-3 gap-4">
		{#each banWordFilters as banWordFilter (banWordFilter.id)}
			<BanWordFilterCard {banWordFilter} />
		{/each}
		<AddCard />
	</div>
</article>
