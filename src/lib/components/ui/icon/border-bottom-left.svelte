<script lang="ts" context="module">
	import type { HTMLAttributes } from 'svelte/elements';
</script>

<script lang="ts">
	type $$Props = HTMLAttributes<SVGElement>;
</script>

<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...$$restProps}>
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M5 4C5.55228 4 6 4.44772 6 5V17C6 17.5523 6.44772 18 7 18H19C19.5523 18 20 18.4477 20 19C20 19.5523 19.5523 20 19 20H7C5.34315 20 4 18.6569 4 17V5C4 4.44772 4.44772 4 5 4Z"
	/>
</svg>
