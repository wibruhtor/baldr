<script lang="ts" context="module">
	import { page } from '$app/stores';
	import Field from '$lib/components/ui/field/field.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { authStore } from '$lib/stores/auth.store';
</script>

<script lang="ts">
	export let chatSettingsId: string;

	let channel: string = $authStore.username || '';

	let link = '';
	$: {
		const url = new URL($page.url.origin);
		url.pathname = '/chat-widget/' + channel + '/' + chatSettingsId;
		link = url.toString();
	}
</script>

<Field label="Канал" for="channel" let:id>
	<Input {id} name={id} autocomplete={id} bind:value={channel} />
</Field>
<Field label="Ссылка на виджет чата" for="chat-widget-link" let:id>
	<Input {id} name={id} autocomplete={id} value={link} readonly />
</Field>
