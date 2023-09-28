<script lang="ts">
	import BanWordFiltersControl from '$lib/components/page/ban-word-filters/ban-word-filters-control.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="container">
	<BanWordFiltersControl banWordFilters={data.banWordFilters} />
</section>
