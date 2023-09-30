<script lang="ts">
	import type { PageData } from './$types';
	import ChatWidgetsControl from '$lib/components/page/chat-widgets/chat-widgets-control.svelte';

	export let data: PageData;
</script>

<section class="container">
	<ChatWidgetsControl chatSettingsInfo={data.chatSettingsInfo} />
</section>
