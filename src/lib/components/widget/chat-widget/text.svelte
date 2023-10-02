<script lang="ts" context="module">
</script>

<script lang="ts">
	export let text: string;
</script>

<span style="overflow: hidden">: {@html text}</span>

<style lang="postcss">
	:global(.emote) {
		display: inline-block;
		height: 1.5em;
		vertical-align: bottom;
	}
</style>
