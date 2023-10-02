<script lang="ts" context="module">
	import type { TwitchBadge } from '$lib/types/api/entity/twitch-badge';
</script>

<script lang="ts">
	export let badges: TwitchBadge[];

	$: images = badges.map((v) => `<img class="badge" src="${v.image}" alt="" />`).join('');
</script>

<span style="overflow: hidden">{@html images}</span>

<style lang="postcss">
	:global(.badge) {
		display: inline-block;
		height: 1.5em;
		vertical-align: bottom;
		transform: scale(0.8);
	}
</style>
