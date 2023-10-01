<script lang="ts">
	import ChatWidgetEditCard from '$lib/components/page/chat-widgets/edit/[chatWidgetId]/chat-widget-edit-card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Редактирование Виджета чата "{data.chatSettings.name}" | WiBruhTor</title>
</svelte:head>

<section class="container">
	<ChatWidgetEditCard bind:chatSettings={data.chatSettings} />
</section>
