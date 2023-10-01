<script lang="ts">
	import type { PageData } from './$types';
	import ChatWidgetsControl from '$lib/components/page/chat-widgets/chat-widgets-control.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Виджеты Чата | WiBruhTor</title>
</svelte:head>

<section class="container">
	<ChatWidgetsControl chatSettingsInfo={data.chatSettingsInfo} />
</section>
