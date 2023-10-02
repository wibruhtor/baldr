<script lang="ts">
</script>

<slot />

<style lang="postcss">
	:root {
		color-scheme: light;
	}

	:global(html),
	:global(body),
	:global(body) > :global(*) {
		all: initial;
	}
</style>
