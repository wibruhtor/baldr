<script lang="ts">
	import BanWordFilterEditCard from '$lib/components/page/ban-word-filters/edit/[banWordFilterid]/ban-word-filter-edit-card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Редактирование Бан Ворд Фильтра "{data.banWordFilter.name}" | WiBruhTor</title>
</svelte:head>

<section class="container">
	<BanWordFilterEditCard bind:banWordFilter={data.banWordFilter} banWords={data.banWords} />
</section>
