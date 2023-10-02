<script lang="ts" context="module">
	import { chatStore } from '$lib/components/widget/chat-widget/chat-store';
	import { emoteReplacer } from '$lib/utils/emote-replacer';
</script>

<script lang="ts">
	export let text: string;

	$: parsed = emoteReplacer.replace(text, $chatStore.emotes).join(' ');
</script>

<span style="overflow: hidden">: {@html parsed}</span>

<style lang="postcss">
	:global(.emote) {
		display: inline-block;
		height: 1.5em;
		vertical-align: bottom;
	}
</style>
