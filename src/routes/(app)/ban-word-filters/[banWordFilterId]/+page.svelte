<script lang="ts">
	import BanWordFilterEditCard from '$lib/components/page/ban-word-filters/[banWordFilterId]/ban-word-filter-edit-card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="container">
	<BanWordFilterEditCard banWordFilter={data.banWordFilter} banWords={data.banWords} />
</section>
