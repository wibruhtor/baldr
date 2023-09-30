<script lang="ts">
	import ChatWidgetEditCard from '$lib/components/page/chat-widgets/edit/[chatWidgetId]/chat-widget-edit-card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="container">
	<ChatWidgetEditCard chatSettings={data.chatSettings} />
</section>
