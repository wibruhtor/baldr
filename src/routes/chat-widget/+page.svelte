<script lang="ts" context="module">
	import { emoteFetcher } from '$lib/utils/emote-fetcher';
	import { replaceEmotes } from '$lib/utils/emote-replacer';

	const emotes = await emoteFetcher.fetch('635252103');
</script>

<script lang="ts">
	let text = '';

	$: replacedText = replaceEmotes(text, emotes).join(' ');
</script>

<div class="p-8">
	<input bind:value={text} />
	<p>{@html replacedText}</p>
	<pre class="typography-muted">{JSON.stringify(emoteFetcher.getEmoteRecord(), null, 2)}</pre>
</div>

<style lang="postcss">
	:global(body) {
		background-color: transparent !important;
	}
</style>
